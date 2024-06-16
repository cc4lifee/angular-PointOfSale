const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    paymentMethod: { type: String, enum: ["cash", "card"], required: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
