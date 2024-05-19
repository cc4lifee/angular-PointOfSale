/* 
    Empleados
    Ruta: "/api/empleados"
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} = require("../controllers/empleados");

const router = Router();

// Get
router.get("/", validarJWT, getEmpleados);

// Post
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del empleado es necesario").notEmpty(),
    check("email", "El email del empleado es necesario").isEmail().notEmpty(),
    check("puesto", "El puesto del empleado es necesario").notEmpty(),
    validarCampos,
  ],
  createEmpleado
);

// Put
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del empleado es necesario").notEmpty(),
    check("email", "El email del empleado es necesario").isEmail().notEmpty(),
    check("puesto", "El puesto del empleado es necesario").notEmpty(),
    validarCampos,
  ],
  updateEmpleado
);

// Delete
router.delete("/:id", validarJWT, deleteEmpleado);

module.exports = router;
