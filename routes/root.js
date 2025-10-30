const express = require("express");
const router = express.Router();
const path = require("path");

// app.get("/index.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "view", "index.html"));
// });

// app.get(/^\/$|\/index(.html)/, (req, res) => {
router.get(/^\/$|\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});

// app.get("/new-page.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "view", "new-page.html"));
// });

router.get(/^\/$|\/new-page(\.html)?$/, (req, res) => {
  // app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "view", "new-page.html"));
});

// app.get(/\/old-page(.html)?$/, (req, res) => {
// app.get("old-page.html", (req, res) => {
router.get(/^\/$|\/old-page(\.html)?$/, (req, res) => {
  res.redirect(301, "new-page.html");
});

// ***
// router.get(/^\/$|\/chat(\.html)?$/, (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "view", "chat.html"));
// });
// ***

module.exports = router;
