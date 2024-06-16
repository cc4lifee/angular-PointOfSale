/* 
 Route: /api/suppliers
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/suppliers.controller");

const router = Router();

// Get
router.get("/", getSuppliers);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("name", "Supplier name is required").notEmpty(),
    validateFields,
  ],
  createSupplier
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Supplier name is required").notEmpty(),
    validateFields,
  ],
  updateSupplier
);

// Delete
router.delete("/:id", validateJWT, deleteSupplier);

module.exports = router;
