const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepo = require("../repositories/authRepository");

exports.register = async (email, password) => {
  const existingUser = await authRepo.findByEmail(email);
  if (existingUser.length) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await authRepo.createUser(email, hashedPassword);
};

exports.login = async (email, password) => {
  const user = await authRepo.findByEmail(email);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};
