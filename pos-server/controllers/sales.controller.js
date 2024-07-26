const { response } = require("express");
const Sale = require("../models/sale.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Client = require("../models/client.model");
const mongoose = require("mongoose");
const Transaction = require("../models/transaction.model");

const getSales = async (req, res = response) => {
  const sales = await Sale.find()
    .populate("user", "name")
    .populate("client", "name")
    .populate("products.product", "name");

  res.json({
    ok: true,
    sales,
  });
};

const createSale = async (req, res = response) => {
  const uid = req.uid;
  const { orderId, paymentMethod } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).populate("products.product");
    if (!order) {
      throw new Error(`Order with id ${orderId} does not exist`);
    }
    
   
    // Check and update product stock
    for (const item of order.products) {
      const product = item.product;
      if (product.stock < item.quantity) {
        throw new Error(`Product with id ${product._id} does not have enough stock`);
      }
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const sale = new Sale({
      user: uid,
      client: order.client,
      products: order.products,
      total: order.total,
      paymentMethod,
    });

    const saleDB = await sale.save({ session });

    const transaction = new Transaction({
      order: saleDB._id,
      paymentMethod,
      amount: order.total,
    });

    await transaction.save({ session });

    // Update the client's purchases
    await Client.findByIdAndUpdate(
      order.client,
      { $push: { purchases: saleDB._id } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    // Mark the order as completed
    order.status = "completed";
    await order.save();

    res.json({
      ok: true,
      sale: saleDB,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

const updateSale = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const sale = await Sale.findById(id);

    if (!sale) {
      return res.status(404).json({
        ok: false,
        msg: "Sale not found by id",
      });
    }

    const saleChanges = {
      ...req.body,
      user: uid,
    };

    const saleUpdated = await Sale.findByIdAndUpdate(id, saleChanges, {
      new: true,
    });

    res.json({
      ok: true,
      sale: saleUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteSale = async (req, res = response) => {
  const id = req.params.id;

  try {
    const sale = await Sale.findById(id);

    if (!sale) {
      return res.status(404).json({
        ok: false,
        msg: "Sale not found by id",
      });
    }

    await Sale.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Sale deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  getSales,
  createSale,
  updateSale,
  deleteSale,
};
