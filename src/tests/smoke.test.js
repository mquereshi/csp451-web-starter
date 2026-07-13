// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");
const { connect } = require("../db");

(function run() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  console.log("✅ smoke.test.js passed");
})();

(function authRouteCheck() {
  const { router } = require("../routes/auth");
  assert.ok(router, "auth router should be defined");
  console.log("✅ auth route smoke check passed");
})();

(function dbQueryCheck() {
  const { insert, query } = require("../db");
  insert("users", { id: 1, email: "a@b.com" });
  const rows = query("users", (r) => r.id === 1);
  assert.strictEqual(rows.length, 1);
  console.log("✅ db insert/query smoke check passed");
})();
