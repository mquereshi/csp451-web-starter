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

(function apiItemsCheck() {
  const { router } = require("../routes/api");
  assert.ok(router, "api router should be defined");
  console.log("✅ api router smoke check passed");
})();