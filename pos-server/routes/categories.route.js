/* 
 Route: /api/categories
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

const router = Router();

// Get
router.get("/", getCategories);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("name", "Category name is required").notEmpty(),
    validateFields,
  ],
  createCategory
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Category name is required").notEmpty(),
    validateFields,
  ],
  updateCategory
);

// Delete
router.delete("/:id", validateJWT, deleteCategory);

module.exports = router;
