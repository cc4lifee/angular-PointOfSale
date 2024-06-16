/* 
 Route: /api/employees
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees.controller");

const router = Router();

// Get
router.get("/", validateJWT, getEmployees);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("name", "Employee name is required").notEmpty(),
    check("email", "Employee email is required").isEmail().notEmpty(),
    check("position", "Employee position is required").notEmpty(),
    validateFields,
  ],
  createEmployee
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Employee name is required").notEmpty(),
    check("email", "Employee email is required").isEmail().notEmpty(),
    check("position", "Employee position is required").notEmpty(),
    validateFields,
  ],
  updateEmployee
);

// Delete
router.delete("/:id", validateJWT, deleteEmployee);

module.exports = router;
