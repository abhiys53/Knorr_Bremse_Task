const rateLimit = require("express-rate-limit");

// Global rate limiter (applies to all APIs)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true, // Sends `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});

module.exports = apiLimiter;
