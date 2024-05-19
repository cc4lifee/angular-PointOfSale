/* 
    Ventas
    Ruta: "/api/ventas"
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getVentas,
  createVenta,
  updateVenta,
  deleteVenta,
} = require("../controllers/ventas");

const router = Router();

// Get
router.get("/", validarJWT, getVentas);

// Post
router.post(
  "/",
  [
    validarJWT,
    check("productos", "Los productos son necesarios").isArray().notEmpty(),
    check("productos.*.producto", "El ID del producto es necesario").isMongoId(),
    check("productos.*.cantidad", "La cantidad es necesaria").isInt({ min: 1 }),
    check("productos.*.precio", "El precio es necesario").isFloat({ min: 0 }),
    check("total", "El total de la venta es necesario").isFloat({ min: 0 }),
    validarCampos,
  ],
  createVenta
);

// Put
router.put(
  "/:id",
  [
    validarJWT,
    check("productos", "Los productos son necesarios").isArray().notEmpty(),
    check("productos.*.producto", "El ID del producto es necesario").isMongoId(),
    check("productos.*.cantidad", "La cantidad es necesaria").isInt({ min: 1 }),
    check("productos.*.precio", "El precio es necesario").isFloat({ min: 0 }),
    check("total", "El total de la venta es necesario").isFloat({ min: 0 }),
    validarCampos,
  ],
  updateVenta
);
// Delete
router.delete("/:id", validarJWT, deleteVenta);

module.exports = router;
