const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Invalid email",
      });
    }

    const validPassword = bcryptjs.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    const token = await generateJWT(userDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generateJWT(uid);
  const user = await User.findById(uid);
  res.json({
    ok: true,
    token,
    user,
  });
};

const googleSignIn = async (req, res) => {
 
  try {
    const { email, name, picture } = await googleVerify(req.body.token);
    const userDB = await User.findOne({ email });

    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();
    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
   
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Invalid Google token",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
