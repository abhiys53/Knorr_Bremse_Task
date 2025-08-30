const path = require("path");

module.exports = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  DATABASE_PATH: path.join(__dirname, "../../Database/knorbremese.db"),
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey"
};