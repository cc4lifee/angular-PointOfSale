/* 
 Route: /api/clients
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clients.controller");

const router = Router();

// Get
router.get("/", validateJWT, getClients);

// Post
router.post(
  "/",
  [
    validateJWT,
    check("name", "Client name is required").notEmpty(),
    check("email", "Client email is required").isEmail().notEmpty(),
    validateFields,
  ],
  createClient
);

// Put
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Client name is required").notEmpty(),
    check("email", "Client email is required").isEmail().notEmpty(),
    validateFields,
  ],
  updateClient
);

// Delete
router.delete("/:id", validateJWT, deleteClient);

module.exports = router;
