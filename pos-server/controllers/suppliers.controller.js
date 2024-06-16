const { response } = require("express");
const Supplier = require("../models/supplier.model");

const getSuppliers = async (req, res = response) => {
  const suppliers = await Supplier.find();

  res.json({
    ok: true,
    suppliers,
  });
};

const createSupplier = async (req, res = response) => {
  try {
    const uid = req.uid;

    const supplier = new Supplier({
      user: uid,
      ...req.body,
    });

    const supplierDB = await supplier.save();

    res.status(201).json({
      ok: true,
      supplier: supplierDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
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
        msg: "Supplier not found by id",
      });
    }

    const supplierChanges = {
      ...req.body,
    };

    const supplierUpdated = await Supplier.findByIdAndUpdate(
      id,
      supplierChanges,
      { new: true }
    );

    res.json({
      ok: true,
      supplier: supplierUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
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
        msg: "Supplier not found by id",
      });
    }

    await Supplier.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Supplier deleted",
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
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
