const { response } = require("express");
const Transaction = require("../models/transaction.model");

const getTransactions = async (req, res = response) => {
  const transactions = await Transaction.find()
    .populate("order", "total")
    .populate("user", "name");

  res.json({
    ok: true,
    transactions,
  });
};

const createTransaction = async (req, res = response) => {
  const uid = req.uid;
  const { order, paymentMethod, amount } = req.body;

  try {
    const transaction = new Transaction({
      user: uid,
      order,
      paymentMethod,
      amount,
    });

    const transactionDB = await transaction.save();

    res.status(201).json({
      ok: true,
      transaction: transactionDB,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateTransaction = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        ok: false,
        msg: "Transaction not found by id",
      });
    }

    const transactionChanges = {
      ...req.body,
      user: uid,
    };

    const transactionUpdated = await Transaction.findByIdAndUpdate(
      id,
      transactionChanges,
      { new: true }
    );

    res.json({
      ok: true,
      transaction: transactionUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteTransaction = async (req, res = response) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        ok: false,
        msg: "Transaction not found by id",
      });
    }

    await Transaction.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Transaction deleted",
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
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
