/* 
 Route: /api/sales
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getSales,
  createSale,
  updateSale,
  deleteSale,
} = require("../controllers/sales.controller");

const router = Router();

// Get
router.get("/", validateJWT, getSales);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("paymentMethod", "Payment method is required").isIn(["cash", "card"]),
    validateFields,
  ],
  createSale
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("products", "Products are required").isArray().notEmpty(),
    check("products.*.product", "Product ID is required").isMongoId(),
    check("products.*.quantity", "Quantity is required").isInt({ min: 1 }),
    check("products.*.price", "Price is required").isFloat({ min: 0 }),
    check("total", "Total amount is required").isFloat({ min: 0 }),
    check("paymentMethod", "Payment method is required").isIn(["cash", "card"]),
    validateFields,
  ],
  updateSale
);

// Delete
router.delete("/:id", validateJWT, deleteSale);

module.exports = router;
