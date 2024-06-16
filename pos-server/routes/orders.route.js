/* 
 Route: /api/orders
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getOrders,
  createOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
} = require("../controllers/orders.controller");

const router = Router();

// Get
router.get("/", validateJWT, getOrders);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("products", "Products are required").isArray().notEmpty(),
    check("products.*.product", "Product ID is required").isMongoId(),
    check("products.*.quantity", "Quantity is required").isInt({ min: 1 }),
    check("products.*.price", "Price is required").isFloat({ min: 0 }),
    check("total", "Total amount is required").isFloat({ min: 0 }),
    validateFields,
  ],
  createOrder
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
    validateFields,
  ],
  updateOrder
);

// Cancel
router.put("/cancel/:id", validateJWT, cancelOrder);

// Delete
router.delete("/:id", validateJWT, deleteOrder);

module.exports = router;
