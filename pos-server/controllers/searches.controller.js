const { response } = require("express");
const User = require("../models/user.model");

const getEverything = async (req, res = response) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  const [users] = await Promise.all([
    User.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    users,
  });
};

const getDocumentsByCollection = async (req, res = response) => {
  const search = req.params.search;
  const collection = req.params.collection;
  const regex = new RegExp(search, "i");

  let data = [];

  switch (collection) {
    case "users":
      data = await User.find({ name: regex });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Collection must be users",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  getEverything,
  getDocumentsByCollection,
};
