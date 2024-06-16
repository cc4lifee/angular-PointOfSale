const { response } = require("express");
const Employee = require("../models/employee.model");

const getEmployees = async (req, res = response) => {
  const employees = await Employee.find().populate('user', 'name');
  res.json({
    ok: true,
    employees,
  });
};

const createEmployee = async (req, res = response) => {
  const uid = req.uid;
  const { email } = req.body;

  const employee = new Employee({
    user: uid,
    ...req.body,
  });

  try {
    const emailExists = await Employee.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const employeeDB = await employee.save();
    res.json({
      ok: true,
      employee: employeeDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateEmployee = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        ok: false,
        msg: 'Employee not found by id',
      });
    }

    const employeeChanges = {
      ...req.body,
      user: uid,
    };

    const employeeUpdated = await Employee.findByIdAndUpdate(id, employeeChanges, { new: true });

    res.json({
      ok: true,
      employee: employeeUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

const deleteEmployee = async (req, res = response) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        ok: false,
        msg: 'Employee not found by id',
      });
    }

    await Employee.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'Employee deleted',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
