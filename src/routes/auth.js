const express = require("express");

const router = express.Router();

/**
 * POST /api/auth/login
 * Stub authentication endpoint for feature/user-authentication.
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  // Stub: no real user store yet. Accept any well-formed credentials.
  return res.json({ message: `Welcome, ${email}!` });
});

module.exports = { router };