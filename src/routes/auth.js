const express = require("express");

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/auth/login
 * Stub authentication endpoint for feature/user-authentication.
 *
 * Server-side validation is required here too: the client-side check in
 * public/login.js can be bypassed by anyone calling this endpoint directly
 * (curl, Postman, etc.), so we re-validate email format and password
 * length on the server before accepting credentials.
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  // Stub: no real user store yet. Accept any well-formed credentials.
  return res.json({ message: `Welcome, ${email}!` });
});

module.exports = { router };
