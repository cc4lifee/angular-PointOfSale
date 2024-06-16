const { response } = require("express");
const Category = require("../models/category.model");
const Supplier = require("../models/supplier.model");
const Product = require("../models/product.model");

const getProducts = async (req, res = response) => {
  const products = await Product.find();

  res.json({
    ok: true,
    products,
  });
};

const createProduct = async (req, res = response) => {
  const uid = req.uid;
  const { category, supplier } = req.body;
  try {
    const product = new Product({
      user: uid,
      ...req.body,
    });

    const productDB = await product.save();

    const categoryToUpdate = await Category.findById(category);
    categoryToUpdate.products.push(productDB._id);
    await categoryToUpdate.save();

    const supplierToUpdate = await Supplier.findById(supplier);
    supplierToUpdate.products.push(productDB._id);
    await supplierToUpdate.save();

    res.status(201).json({
      ok: true,
      product: productDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateProduct = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "Product not found by id",
      });
    }

    const productChanges = {
      ...req.body,
    };

    const productUpdated = await Product.findByIdAndUpdate(
      id,
      productChanges,
      { new: true }
    );

    res.json({
      ok: true,
      product: productUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteProduct = async (req, res = response) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: "Product not found by id",
      });
    }

    await Product.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Product deleted",
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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
