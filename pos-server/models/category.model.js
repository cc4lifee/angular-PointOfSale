const { Schema, model } = require("mongoose");

const CategorySchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    products: [{ type: Schema.Types.ObjectId, ref: "Product", index: true }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { collection: "categories", timestamps: true }
);

CategorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Category", CategorySchema);
