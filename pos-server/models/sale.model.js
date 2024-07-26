const { Schema, model } = require("mongoose");

const SaleSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    client: { type: Schema.Types.ObjectId, ref: "Client", index: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
         
          index: true,
        },
        quantity: { type: Number,  min: 1 },
        price: { type: Number,  min: 0 },
      },
    ],
    total: { type: Number,  min: 0 },
    paymentMethod: { type: String, enum: ["cash", "card"], required: true },
  },
  { collection: "sales", timestamps: true }
);

SaleSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Sale", SaleSchema);
