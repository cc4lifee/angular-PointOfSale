const { response } = require("express");
const Category = require("../models/category");
const Product = require("../models/product");

const getCategories = async (req, res = response) => {
  const categories = await Category.find();

  res.json({
    ok: true,
    categories: categories,
  });
};

const createCategory = async (req, res = response) => {
  try {
    const uid = req.uid;

    const category = new Category({
      usuario: uid,
      ...req.body,
    });

    const categoryDB = await category.save();

    res.status(201).json({
      ok: true,
      category: categoryDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateCategory = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category no encontrado por id",
      });
    }

    const cambiosCategory = {
      ...req.body,
    };

    const categoryUpdated = await Category.findByIdAndUpdate(
      id,
      cambiosCategory,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "actualizarCategory",
      product: categoryUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteCategory = async (req, res = response) => {
  const id = req.params.id;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category no encontrado por id",
      });
    }

    await Category.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Category Eliminado",
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
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
