# Copilot Code Review

Copilot code review is a GitHub.com review workflow that posts non-blocking comments and applicable suggestions. It supplements human review; it does not approve risk on behalf of the team.

## Customization

Current review behavior can use:

- `.github/copilot-instructions.md`
- `.github/instructions/**/*.instructions.md`
- `AGENTS.md`
- `REVIEW.md`
- `CLAUDE.md`
- `GEMINI.md`
- skills from the pull request head branch
- repository review workflow and firewall configuration

Use `.github/workflows/copilot-code-review.yml` when the repository needs explicit review-runner configuration.

## Review loop

1. Request Copilot review.
2. Triage comments for correctness and impact.
3. Apply or reject suggestions deliberately.
4. Re-run tests and checks.
5. Re-request review after material changes.

## Current preview areas

- medium review effort
- passing suggestions directly to cloud agent
- selected skills and MCP integrations in code review

Always verify preview status before a workshop.
