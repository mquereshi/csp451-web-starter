# Conflict Resolution Report (≈300 words)

## 1) Conflict Scenario

The conflict was introduced intentionally in `README.md`, on the `## Quick Start`
heading line. On `feature/user-authentication`, the heading was changed to
`## Quick Start (Auth Branch Notes)`. On `feature/api-endpoints`, the same line was
changed independently to `## Quick Start (API Branch Notes)`. Since the auth branch's
PR (#5) was merged into `main` first, `main` carried the auth wording forward. When
`feature/api-endpoints`'s PR (#6) was later merged, GitHub could not automatically
reconcile the two different edits to the same line. A related conflict also appeared
in `src/tests/smoke.test.js`, because all three feature branches independently
appended a new smoke-test function to the end of the same file, and Git could not
tell how to order the additions relative to a shared insertion point.

## 2) What You Saw

Merging `origin/main` into `feature/api-endpoints` locally produced standard conflict
markers in `README.md`:

```
<<<<<<< HEAD
## Quick Start (API Branch Notes)
=======
## Quick Start (Auth Branch Notes)
>>>>>>> origin/main
```

`smoke.test.js` showed a similar marker block wrapping the competing test functions
(see attached screenshot for both files, captured before resolution).

## 3) Resolution Strategy

For `README.md`, both notes were kept rather than picking one branch over the other,
merging the heading into `## Quick Start (Auth + API Branch Notes)` — this preserves
the intent of both branches instead of discarding either author's context. For
`smoke.test.js`, all three test functions (`apiItemsCheck`, `authRouteCheck`,
`dbQueryCheck`) were kept, since each validates an independent module and none were
mutually exclusive; only the conflict marker lines themselves were removed. The
result was verified by running `npm test` immediately after resolving, confirming all
four smoke checks passed, then again after the squash-merge landed on `main`.

## 4) Prevention Methods

- **Merge/rebase from `main` more frequently** during development instead of letting
  three long-lived feature branches diverge for the entire checkpoint before merging.
- **Avoid shared "junk drawer" files** like a single `smoke.test.js` for unrelated
  features — separate test files per feature would have avoided the second conflict.
- **Communicate before touching shared files** (README, config) — on a real team,
  a quick message before editing a heading everyone touches prevents duplicate edits.
- **Keep PRs small and merge promptly** so branches don't sit long enough to diverge
  significantly from `main`.
