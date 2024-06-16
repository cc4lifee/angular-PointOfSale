const { Schema, model } = require("mongoose");

const SupplierSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    contactInfo: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product", index: true }],
  },
  { collection: "suppliers", timestamps: true }
);

SupplierSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Supplier", SupplierSchema);
