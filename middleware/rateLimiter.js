// const rateLimit = require("express-rate-limit");
const rateLimit = require("express-rate-limiter");

const apiLimiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, take a break!",
});

module.exports = apiLimiter;
