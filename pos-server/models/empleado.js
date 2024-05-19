const { Schema, model } = require("mongoose");

const EmpleadoSchema = Schema(
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
    puesto: {
      type: String,
      required: true,
    },
    salario: {
      type: Number,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  { collection: "empleados" }
);

EmpleadoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Empleado", EmpleadoSchema);
