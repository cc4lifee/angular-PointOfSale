const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Verificar Email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no valido",
      });
    }

    // Verificar password
    const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }

    // Generar el Token - JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con administrator",
    });
  }
};


const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar el Token - JWT
  const token = await generarJWT(uid);

  //Obtener el usuario por UID 
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario
  });
};

module.exports = {
  login,
  // googleSingIn,
  renewToken,
};
