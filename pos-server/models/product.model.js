const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    description: String,
    img: String,
    category: { type: Schema.Types.ObjectId, ref: "Category", index: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", index: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { collection: "products", timestamps: true }
);

ProductSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Product", ProductSchema);
