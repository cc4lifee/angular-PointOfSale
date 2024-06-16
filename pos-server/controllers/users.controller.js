const { response } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const offset = Number(req.query.offset) || 0;

  const [users, total] = await Promise.all([
    User.find({}, "name email role google img").skip(offset).limit(5),
    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    total,
  });
};

const createUser = async (req, res = response) => {
  const { email, password, name } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const user = new User(req.body);

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    const token = await generateJWT(user.id);

    await user.save();

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found by id",
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          msg: "Email already exists",
        });
      }
    }

    if (!userDB.google) {
      fields.email = email;
    } else if (userDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: 'Google user cannot change email',
      });
    }

    const userUpdated = await User.findByIdAndUpdate(uid, fields);

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found by id",
      });
    }

    await User.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      msg: "User deleted successfully",
      uid,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
