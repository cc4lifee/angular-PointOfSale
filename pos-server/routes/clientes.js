/* 
    Clientes
    Ruta: "/api/clientes"
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} = require("../controllers/clientes");

const router = Router();

// Get
router.get("/", validarJWT, getClientes);

// Post
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del cliente es necesario").notEmpty(),
    check("email", "El email del cliente es necesario").isEmail().notEmpty(),
    validarCampos,
  ],
  createCliente
);

// Put
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del cliente es necesario").notEmpty(),
    check("email", "El email del cliente es necesario").isEmail().notEmpty(),
    validarCampos,
  ],
  updateCliente
);

// Delete
router.delete("/:id", validarJWT, deleteCliente);

module.exports = router;
