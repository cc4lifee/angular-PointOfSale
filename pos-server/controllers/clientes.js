const { response } = require("express");
const Cliente = require("../models/cliente");

const getClientes = async (req, res = response) => {
  const clientes = await Cliente.find().populate("usuario", "nombre");
  res.json({
    ok: true,
    clientes,
  });
};

const createCliente = async (req, res = response) => {
  const uid = req.uid;
  const { email } = req.body;

  const cliente = new Cliente({
    usuario: uid,
    ...req.body,
  });

  try {
    const existeEmail = await Cliente.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const clienteDB = await cliente.save();
    res.json({
      ok: true,
      cliente: clienteDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateCliente = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado por id",
      });
    }

    const cambiosCliente = {
      ...req.body,
      usuario: uid,
    };

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      cambiosCliente,
      { new: true }
    );

    res.json({
      ok: true,
      cliente: clienteActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteCliente = async (req, res = response) => {
  const id = req.params.id;

  try {
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "Cliente no encontrado por id",
      });
    }

    await Cliente.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Cliente eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
};
