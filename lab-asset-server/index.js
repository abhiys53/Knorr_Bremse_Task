// index.js
const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/corsMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const assetRoutes = require("./routes/assetRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const apiLimiter = require("./middlewares/rateLimiter");
const authRoutes = require("./routes/authRoutes");
const fs = require("fs");

const { sequelize } = require("./models");
const { PORT, DATABASE_PATH } = require("./config/config");

const app = express();
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(apiLimiter);

// --- Check if database exists ---
if (!fs.existsSync(DATABASE_PATH)) {
  console.error("Database file not found at:", DATABASE_PATH);
  console.error("Server will not start to prevent accidental DB creation.");
  process.exit(1);
}


(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
})();

// --- Routes ---

app.use("/auth", authRoutes);
app.use("/assets", authMiddleware, assetRoutes);
app.use("/reservations", authMiddleware, reservationRoutes);

// --- Error handler ---
app.use(errorHandler);

// --- Start server ---
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
