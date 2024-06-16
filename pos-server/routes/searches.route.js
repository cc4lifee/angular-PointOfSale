/*
 Route: /api/search
*/

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getEverything, getDocumentsByCollection } = require("../controllers/searches.controller");

const router = Router();

// Get
router.get("/:search", validateJWT, getEverything);

router.get("/collection/:collection/:search", validateJWT, getDocumentsByCollection);

module.exports = router;
