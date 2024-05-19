const { Schema, model } = require("mongoose");

const VentaSchema = Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
    },
    productos: [
      {
        producto: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "ventas" }
);

VentaSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Venta", VentaSchema);
