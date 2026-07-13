const express = require("express");

const router = express.Router();
const items = [];

router.get("/items", (req, res) => {
  res.json({ items });
});

router.post("/items", (req, res) => {
  const { name } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Field 'name' is required and must be a non-empty string." });
  }

  const item = { id: items.length + 1, name: name.trim() };
  items.push(item);
  return res.status(201).json({ item });
});

module.exports = { router };
