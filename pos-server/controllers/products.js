const { response } = require("express");
const Category = require("../models/category");
const Supplier = require("../models/supplier");
const Product = require("../models/product");

const getProducts = async (req, res = response) => {
  const products = await Product.find();

  res.json({
    ok: true,
    products: products,
  });
};

const createProduct = async (req, res = response) => {
  const uid = req.uid;
  const { category, supplier } = req.body;
  try {
    const product = new Product({
      usuario: uid,
      ...req.body,
    });

    const productDB = await product.save();

    // Actualizar la categoría asociada con el nuevo producto
    const categoryToUpdate = await Category.findById(category);
    categoryToUpdate.products.push(productDB._id);
    await categoryToUpdate.save();

    // Actualizar el proveedor asociado con el nuevo producto
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
      msg: "Hable con el administrador",
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
        msg: "Product no encontrado por id",
      });
    }

    const cambiosProduct = {
      ...req.body,
    };

    const productActualizado = await Product.findByIdAndUpdate(
      id,
      cambiosProduct,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "actualizarProduct",
      product: productActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
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
        msg: "Product no encontrado por id",
      });
    }

    await Product.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Product Eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
