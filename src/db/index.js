/**
 * Database module — in-memory store with env-based config.
 *
 * Feature branch: feature/database-connection
 */
const config = {
  url: process.env.DB_URL || "memory://local",
  pool: Number(process.env.DB_POOL || 4),
};

const store = new Map();

function connect() {
  return { connected: true, driver: "memory", config };
}

function query(table, predicate = () => true) {
  const rows = store.get(table) || [];
  return rows.filter(predicate);
}

function insert(table, row) {
  if (!store.has(table)) store.set(table, []);
  store.get(table).push(row);
  return row;
}

module.exports = { connect, query, insert, config };