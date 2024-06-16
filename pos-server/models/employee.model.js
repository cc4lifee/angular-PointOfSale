const { Schema, model } = require("mongoose");

const EmployeeSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: String,
    address: String,
    position: { type: String, required: true },
    salary: { type: Number, min: 0 },
    hireDate: { type: Date, default: Date.now },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { collection: "employees", timestamps: true }
);

EmployeeSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Employee", EmployeeSchema);
