const { Schema, model } = require("mongoose");

const ClienteSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telefono: {
      type: String,
    },
    direccion: {
      type: String,
    },
    compras: [
      {
        type: Schema.Types.ObjectId,
        ref: "Venta",
      },
    ],
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { collection: "clientes" }
);

ClienteSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Cliente", ClienteSchema);
