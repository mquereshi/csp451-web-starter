/**
 * Login behavior with inline validation and feedback states.
 */
const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const submitBtn = form.querySelector("button[type='submit']");

function setMessage(text, kind) {
  message.textContent = text;
  message.className = kind ? `muted ${kind}` : "muted";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setMessage("Please enter a valid email address.", "error");
    return;
  }
  if (password.length < 6) {
    setMessage("Password must be at least 6 characters.", "error");
    return;
  }

  submitBtn.disabled = true;
  setMessage("Signing in...", "loading");

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage(data.message || "Login successful.", "success");
    } else {
      setMessage(data.error || "Login failed.", "error");
    }
  } catch (err) {
    setMessage("Network error. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});