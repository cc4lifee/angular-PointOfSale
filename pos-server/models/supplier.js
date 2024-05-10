const { Schema, model } = require("mongoose");

const SupplierSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact_info: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { collection: "suppliers" }
);

SupplierSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Supplier", SupplierSchema);
