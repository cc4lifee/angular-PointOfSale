const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    img: String,
    role: {
      type: String,
      required: true,
      enum: ["ADMIN_ROLE", "USER_ROLE"],
      default: "USER_ROLE",
    },
    google: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("User", UserSchema);
