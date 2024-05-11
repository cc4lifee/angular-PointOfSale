const { response } = require("express");
const Supplier = require("../models/supplier");
const Product = require("../models/product");

const getSuppliers = async (req, res = response) => {
  const suppliers = await Supplier.find();

  res.json({
    ok: true,
    suppliers: suppliers,
  });
};

const createSupplier = async (req, res = response) => {
  try {
    const uid = req.uid;

    const supplier = new Supplier({
      usuario: uid,
      ...req.body,
    });

    const supplierDB = await supplier.save();

    res.status(201).json({
      ok: true,
      category: supplierDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateSupplier = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({
        ok: false,
        msg: "Supplier no encontrado por id",
      });
    }

    const cambiosSupplier = {
      ...req.body,
    };

    const supplierUpdated = await Supplier.findByIdAndUpdate(
      id,
      cambiosSupplier,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "actualizarSupplier",
      product: supplierUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteSupplier = async (req, res = response) => {
  const id = req.params.id;

  try {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
      return res.status(404).json({
        ok: false,
        msg: "Supplier no encontrado por id",
      });
    }

    await Supplier.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Supplier Eliminado",
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
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
