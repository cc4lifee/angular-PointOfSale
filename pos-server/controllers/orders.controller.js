const { response } = require("express");
const Order = require("../models/order.model");

const getOrders = async (req, res = response) => {
  const orders = await Order.find()
    .populate("client", "name")
    .populate("products.product", "name");

  res.json({
    ok: true,
    orders,
  });
};

const createOrder = async (req, res = response) => {
  const uid = req.uid;
  const { products, total, client } = req.body;

  try {
    const order = new Order({
      user: uid,
      products,
      total,
      client,
      status: "pending",
    });

    const orderDB = await order.save();

    res.status(201).json({
      ok: true,
      order: orderDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateOrder = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "Order not found by id",
      });
    }

    const orderChanges = {
      ...req.body,
      user: uid,
    };

    const orderUpdated = await Order.findByIdAndUpdate(id, orderChanges, {
      new: true,
    });

    res.json({
      ok: true,
      order: orderUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const cancelOrder = async (req, res = response) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "Order not found by id",
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteOrder = async (req, res = response) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: "Order not found by id",
      });
    }

    await Order.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Order deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
};
