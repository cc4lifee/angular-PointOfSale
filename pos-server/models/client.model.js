const { Schema, model } = require("mongoose");

const ClientSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  address: String,
  purchases: [{ type: Schema.Types.ObjectId, ref: "Sale", index: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { collection: "clients", timestamps: true });

ClientSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Client", ClientSchema);
