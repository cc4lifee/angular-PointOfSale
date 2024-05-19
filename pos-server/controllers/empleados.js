const { response } = require("express");
const Empleado = require("../models/empleado");

const getEmpleados = async (req, res = response) => {
  const empleados = await Empleado.find().populate('usuario', 'nombre');
  res.json({
    ok: true,
    empleados,
  });
};

const createEmpleado = async (req, res = response) => {
  const uid = req.uid;
  const { email } = req.body;

  const empleado = new Empleado({
    usuario: uid,
    ...req.body,
  });

  try {

    const existeEmail = await Empleado.findOne({ email });

    if (existeEmail) {
      console.log('email exise');
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const empleadoDB = await empleado.save();
    res.json({
      ok: true,
      empleado: empleadoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const updateEmpleado = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const empleado = await Empleado.findById(id);

    if (!empleado) {
      return res.status(404).json({
        ok: false,
        msg: 'Empleado no encontrado por id',
      });
    }

    const cambiosEmpleado = {
      ...req.body,
      usuario: uid,
    };

    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, cambiosEmpleado, { new: true });

    res.json({
      ok: true,
      empleado: empleadoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const deleteEmpleado = async (req, res = response) => {
  const id = req.params.id;

  try {
    const empleado = await Empleado.findById(id);

    if (!empleado) {
      return res.status(404).json({
        ok: false,
        msg: 'Empleado no encontrado por id',
      });
    }

    await Empleado.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Empleado eliminado',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
