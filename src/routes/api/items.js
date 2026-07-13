const express = require("express");

const router = express.Router();
const items = [];

router.get("/items", (req, res) => {
  res.json({ items });
});

const MAX_NAME_LENGTH = 100;

router.post("/items", (req, res) => {
  const { name } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Field 'name' is required and must be a non-empty string." });
  }

  const trimmed = name.trim();

  if (trimmed.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: `Field 'name' must be ${MAX_NAME_LENGTH} characters or fewer.` });
  }

  const isDuplicate = items.some((existing) => existing.name.toLowerCase() === trimmed.toLowerCase());
  if (isDuplicate) {
    return res.status(409).json({ error: `An item named '${trimmed}' already exists.` });
  }

  const item = { id: items.length + 1, name: trimmed };
  items.push(item);
  return res.status(201).json({ item });
});

module.exports = { router };
