# Worktrees and Sessions

The app can isolate parallel tasks in separate Git worktrees and branches.

Use separate worktrees when:

- two tasks may change overlapping dependencies
- you want one long-running session while reviewing another
- a task should be abandoned without cleaning the main working tree
- each task needs its own branch and pull request

Avoid unnecessary parallelism. Small related edits are easier to review in one branch.

## Demo pattern

| Session | Scope | Mode |
|---|---|---|
| A | Add a small feature to `demo-nodejs` | Plan, then Interactive |
| B | Review workshop links without editing | Interactive |
| C | Prepare a larger isolated change | Autopilot with clear limits |

Review each diff and validation result independently before merging work.
