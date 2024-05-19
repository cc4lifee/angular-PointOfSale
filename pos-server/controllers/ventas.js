const { response } = require("express");
const Venta = require("../models/venta");
const Producto = require("../models/product");

const getVentas = async (req, res = response) => {
  const ventas = await Venta.find()
    .populate("usuario", "nombre")
    .populate("cliente", "nombre")
    .populate("productos.producto", "name");
  
  res.json({
    ok: true,
    ventas,
  });
};

const createVenta = async (req, res = response) => {
  const uid = req.uid;
  const { productos, total } = req.body;

  try {
    // Validar que todos los productos existen
    for (const item of productos) {
      const productoExistente = await Producto.findById(item.producto);
      if (!productoExistente) {
        return res.status(400).json({
          ok: false,
          msg: `El producto con id ${item.producto} no existe en la base de datos`,
        });
      }
    }

    // Crear la venta si todos los productos son válidos
    const venta = new Venta({
      usuario: uid,
      productos,
      total,
    });

    const ventaDB = await venta.save();
    res.json({
      ok: true,
      venta: ventaDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateVenta = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const venta = await Venta.findById(id);

    if (!venta) {
      return res.status(404).json({
        ok: false,
        msg: "Venta no encontrada por id",
      });
    }

    const cambiosVenta = {
      ...req.body,
      usuario: uid,
    };

    const ventaActualizada = await Venta.findByIdAndUpdate(id, cambiosVenta, {
      new: true,
    });

    res.json({
      ok: true,
      venta: ventaActualizada,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteVenta = async (req, res = response) => {
  const id = req.params.id;

  try {
    const venta = await Venta.findById(id);

    if (!venta) {
      return res.status(404).json({
        ok: false,
        msg: "Venta no encontrada por id",
      });
    }

    await Venta.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Venta eliminada",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getVentas,
  createVenta,
  updateVenta,
  deleteVenta,
};
