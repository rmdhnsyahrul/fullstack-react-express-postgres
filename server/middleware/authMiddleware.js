const jwt = require("jsonwebtoken");
require("dotenv").config();

function getTokenFromReq(req) {
  // Prioritas: Authorization header -> Cookie (opsional)
  const h = req.headers?.authorization || req.headers?.Authorization;
  if (h && typeof h === "string") {
    const [scheme, token] = h.split(" ");
    if (scheme?.toLowerCase() === "bearer" && token) return token;
  }
  if (req.cookies?.token) return req.cookies.token; // kalau pakai cookie
  return null;
}

async function authenticateToken(req, res, next) {
  const token = getTokenFromReq(req);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil userId dari beberapa kemungkinan claim yang umum
    req.userId = decoded.userId || decoded.sub || decoded.id;
    if (!req.userId) {
      return res.status(401).json({ message: "Token payload missing userId" });
    }

    // (opsional) taruh payload lengkap kalau perlu
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authenticateToken;
