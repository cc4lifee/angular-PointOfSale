/* 
 Route: /api/products
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const router = Router();

// Get
router.get("/", getProducts);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("name", "Product name is required").notEmpty(),
    validateFields,
  ],
  createProduct
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Product name is required").notEmpty(),
    validateFields,
  ],
  updateProduct
);

// Delete
router.delete("/:id", validateJWT, deleteProduct);

module.exports = router;
