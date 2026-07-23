# Simple Node.js Copilot Demo

This dependency-free task board is intentionally small enough to explain in a few minutes. It includes an HTTP API, a single-page UI, and tests using Node's built-in test runner.

## Run it

```bash
cd demo-nodejs
npm test
npm start
```

Open <http://localhost:3000>.

## Suggested demonstrations

| Copilot capability | Prompt |
|---|---|
| Inline completion | Start a `findById(id)` method in `src/task-store.js` and pause for a suggestion. |
| Ask mode | `Explain the request flow from the browser to TaskStore.` |
| Plan mode | `Plan a filter for open and completed tasks, including the files and tests to change.` |
| Agent mode | `Implement the task filter plan and run the tests.` |
| Test generation | `Add boundary tests for task titles and run the suite.` |
| Code review | `Review this demo for correctness, accessibility, and security issues.` |
| Custom instructions | Change a repository instruction, then ask Copilot to add a new endpoint. |
| MCP | Use Playwright MCP to open the app, add a task, and verify it appears. |
| Cloud agent | Open an issue requesting task due dates and delegate it to Copilot. |

The app keeps data in memory so no database setup is required.
