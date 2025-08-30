// middlewares/corsMiddleware.js
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // allow frontend URL
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

module.exports = cors(corsOptions);
