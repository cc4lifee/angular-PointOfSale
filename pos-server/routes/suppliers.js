/* 
    Suppliers
    Ruta: "/api/suppliers"
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/suppliers");

const router = Router();

// Get
router.get("/", getSuppliers);

// Post
router.post(
  "/",
  [
    validarJWT,
    check("name", "el nombre del supplier es necesario").notEmpty(),
    validarCampos,
  ],
  createSupplier
);

// Put
router.put(
  "/:id",
  [
    validarJWT,
    check("name", "el nombre del supplier es necesario").notEmpty(),
  ],
  updateSupplier
);

// Delete
router.delete("/:id", validarJWT, deleteSupplier);

module.exports = router;
