/* 
    Categories
    Ruta: "/api/categories"
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = Router();

// Get
router.get("/", getCategories);

// Post
router.post(
  "/",
  [
    validarJWT,
    check("name", "el nombre del categorie es necesario").notEmpty(),
    validarCampos,
  ],
  createCategory
);

// Put
router.put(
  "/:id",
  [
    validarJWT,
    check("name", "el nombre del categorie es necesario").notEmpty(),
  ],
  updateCategory
);

// Delete
router.delete("/:id", validarJWT, deleteCategory);

module.exports = router;
