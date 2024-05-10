const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    description: String,
    price: Number,
    quantity: Number,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: "products" }
);

ProductSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Product", ProductSchema);
