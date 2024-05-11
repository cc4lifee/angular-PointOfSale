const { Schema, model } = require("mongoose");

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "categories" }
);

CategorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Category", CategorySchema);
