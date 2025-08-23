const { validationResult } = require("express-validator");
const authService = require("../services/authService");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await authService.register(email, password);
    res.status(200).json({
      errors: false,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ errors: false, message: "Success!", data: { token } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
