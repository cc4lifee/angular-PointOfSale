const { response } = require("express");
const Category = require("../models/category.model");
const QRCode = require("qrcode");

const getCategories = async (req, res = response) => {
  const categories = await Category.find();
  
  res.json({
    ok: true,
    categories,
  });
};

const createCategory = async (req, res = response) => {
  try {
    const uid = req.uid;
    
    const category = new Category({
      user: uid,
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
      msg: "Please contact the administrator",
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
        msg: "Category not found by id",
      });
    }
    
    const categoryChanges = {
      ...req.body,
    };
    
    const categoryUpdated = await Category.findByIdAndUpdate(
      id,
      categoryChanges,
      { new: true }
    );
    
    res.json({
      ok: true,
      category: categoryUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
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
        msg: "Category not found by id",
      });
    }
    
    await Category.findByIdAndDelete(id);
    
    res.json({
      ok: true,
      msg: "Category deleted",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const generateClientQRCode = async (req, res = response) => {
  const id = req.params.id;

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Client not found by id",
      });
    }

    const qrCodeUrl = await QRCode.toDataURL(id);

    res.json({
      ok: true,
      qrCodeUrl,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  generateClientQRCode
};
