# Collaboration Workflow Report

## 1) Issues Created

- **#1 — Database connection module**: requested implementing `connect()`, a config
  pattern read from environment variables (`DB_URL`, `DB_POOL`), and a basic
  query/insert API for `src/db/index.js`.
- **#2 — User authentication validation**: requested improving client-side login
  validation and adding a `/api/auth/login` stub route to handle login submissions.
- **#3 — API endpoint expansion**: requested splitting the single `src/routes/api.js`
  file into route modules and adding a POST endpoint with input validation.

## 2) PR Summary (3 PRs)

**PR #4 — `feature/database-connection`** (Closes #1)
- Key changes: in-memory store with `insert()`/`query()`, config read from
  `DB_URL`/`DB_POOL` env vars, README documentation, smoke test coverage.
- Screenshots included: Y

**PR #5 — `feature/user-authentication`** (Closes #2)
- Key changes: inline email/password validation with loading and error states in
  `public/login.js`, a `POST /api/auth/login` stub route, smoke test coverage.
- Screenshots included: Y

**PR #6 — `feature/api-endpoints`** (Closes #3)
- Key changes: split `src/routes/api.js` into `src/routes/api/{health,items,index}.js`,
  added `POST /api/items` with length and duplicate-name validation, smoke test coverage.
- Screenshots included: Y

## 3) Self-Review Evidence

Each PR received at least two comment-based self-reviews on the Files changed tab,
since GitHub does not allow approving or requesting changes on your own PR.

- **PR #4**: reviewed the config pattern in `src/db/index.js` (env defaults look sane
  for local dev) and the simplicity of `query()`/`insert()` for the checkpoint's scope.
- **PR #5**: the **critical comment** was on this PR — noted that the email format
  check only existed client-side in `public/login.js`, so a request sent directly to
  `POST /api/auth/login` (via curl/Postman) would bypass it entirely. Addressed with a
  follow-up commit, `fix(auth): add server-side email format validation`, which added
  a server-side regex check in `src/routes/auth.js` before accepting credentials.
- **PR #6**: reviewed the duplicate-name check and the router split into
  `health.js`/`items.js`/`index.js` for clarity and separation of concerns.

Quality was verified before each merge by running `npm test`, `npm run lint`, and
`npm run format:check` locally, and manually exercising the relevant routes with
`curl` (e.g. confirming `POST /api/items` returns 409 on a duplicate name, and
`POST /api/auth/login` returns 400 on an invalid email).

## 4) Merge Strategy

All three PRs were merged using **Squash and merge**. This kept `main`'s history to
one clean, readable commit per feature — the incremental "work in progress" commits
on each branch (e.g. separate commits for validation, routes, and tests) stayed on
the feature branch and out of `main`'s permanent history, making `git log` on `main`
easy to scan and easier to revert a whole feature in one step if needed.
