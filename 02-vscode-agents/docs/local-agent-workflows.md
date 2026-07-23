# Local Agent Workflow

## Before execution

1. State the desired outcome.
2. Name the files or area in scope when known.
3. Provide constraints and non-goals.
4. Provide the smallest validation command that proves success.

## During execution

- Review requested permissions.
- Add corrections as soon as the plan drifts.
- Prefer small inspect-edit-verify loops.
- Watch for unrelated cleanup.

## After execution

- Review the diff.
- Confirm tests or builds cover the change.
- Use an independent review for non-trivial work.
- Revert or rewind changes that do not meet the acceptance criteria.

Example:

```text
Add an open/completed filter to demo-nodejs.
Keep the app dependency-free, add node:test coverage, and run npm test.
Do not change the API response shape.
```
