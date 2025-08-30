const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

// authentication middleware
module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user info (id, email) in request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
