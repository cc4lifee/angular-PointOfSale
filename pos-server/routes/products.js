/* 
    Products
    Ruta: "/api/products"
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

// Get
router.get("/", getProducts);

// Post
router.post(
  "/",
  [
    validarJWT,
    check("name", "el nombre del product es necesario").notEmpty(),
    validarCampos,
  ],
  createProduct
);

// Put
router.put(
  "/:id",
  [
    validarJWT,
    check("name", "el nombre del product es necesario").notEmpty(),
  ],
  updateProduct
);

// Delete
router.delete("/:id", validarJWT, deleteProduct);

module.exports = router;
