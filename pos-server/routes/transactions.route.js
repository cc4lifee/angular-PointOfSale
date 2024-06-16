/* 
 Route: /api/transactions
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions.controller");

const router = Router();

// Get
router.get("/", validateJWT, getTransactions);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("order", "Order ID is required").isMongoId(),
    check("paymentMethod", "Payment method is required").isIn(["cash", "card"]),
    check("amount", "Amount is required").isFloat({ min: 0 }),
    validateFields,
  ],
  createTransaction
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("order", "Order ID is required").isMongoId(),
    check("paymentMethod", "Payment method is required").isIn(["cash", "card"]),
    check("amount", "Amount is required").isFloat({ min: 0 }),
    validateFields,
  ],
  updateTransaction
);

// Delete
router.delete("/:id", validateJWT, deleteTransaction);

module.exports = router;
