# Cloud-Agent Workflow

## 1. Write a bounded task

Include:

- repository area
- desired outcome
- acceptance criteria
- validation commands
- non-goals
- screenshots or examples when behavior is visual

Example:

```text
Add an open/completed filter to demo-nodejs.

Acceptance criteria:
- filtering works without a page reload
- the API response shape does not change
- node:test coverage is added
- npm test passes
```

## 2. Choose an entry point

- Start a session in the Agents interface for research, planning, and branch-first iteration.
- Assign a GitHub issue when the expected outcome is a pull request.
- Use `/delegate` from Copilot CLI when a local session should continue in the cloud.

## 3. Monitor and steer

Review the plan, session log, changed files, and validation output. Add clarifying comments when the agent makes an unsupported assumption.

## 4. Review the result

Treat the output like any other contribution:

- inspect the diff
- confirm tests cover the request
- request code review
- verify security and dependency changes
- require a human merge decision

## Custom agents and MCP

The cloud agent can use supported custom agents, skills, and configured MCP tools. Cloud MCP tools can run autonomously, so allowlist only trusted, least-privilege tools and store credentials in approved agent secrets or variables.
