const { response } = require("express");
const Client = require("../models/client.model");

const getClients = async (req, res = response) => {
  const clients = await Client.find().populate("user", "name");
  res.json({
    ok: true,
    clients,
  });
};

const createClient = async (req, res = response) => {
  const uid = req.uid;
  const { email } = req.body;

  const client = new Client({
    user: uid,
    ...req.body,
  });

  try {
    const emailExists = await Client.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const clientDB = await client.save();
    res.json({
      ok: true,
      client: clientDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateClient = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Client not found by id",
      });
    }

    const clientChanges = {
      ...req.body,
      user: uid,
    };

    const clientUpdated = await Client.findByIdAndUpdate(
      id,
      clientChanges,
      { new: true }
    );

    res.json({
      ok: true,
      client: clientUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteClient = async (req, res = response) => {
  const id = req.params.id;

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Client not found by id",
      });
    }

    await Client.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Client deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
};
