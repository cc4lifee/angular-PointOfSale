/*
 Route: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = Router();

// Get
router.get("/", validateJWT, getUsers);

// Post
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    validateFields,
  ],
  createUser
);

// Put
router.put(
  "/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

// Delete
router.delete("/:id", deleteUser);

module.exports = router;
