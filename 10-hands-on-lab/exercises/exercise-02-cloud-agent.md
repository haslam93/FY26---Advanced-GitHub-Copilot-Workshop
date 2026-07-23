# Exercise 02 - Cloud Agent

> **Time:** 20 minutes
> **Reference:** [Module 09](../../09-cloud-agent/README.md)

Use a fork or disposable repository.

## Objectives

- Write a bounded issue for the cloud agent.
- Monitor and steer the hosted session.
- Review the resulting pull request like a normal contribution.

## Issue template

```markdown
## Goal
Add an open/completed filter to demo-nodejs.

## Acceptance criteria
- The UI can show all, open, or completed tasks.
- Filtering does not reload the page.
- Existing API response shapes remain unchanged.
- Node tests cover any new store behavior.
- `npm test` passes.

## Non-goals
- Do not add a framework or external dependency.
```

## Steps

1. Create the issue.
2. Assign it to Copilot cloud agent.
3. Review the agent plan and session log.
4. Add a clarifying comment if it proposes a dependency.
5. Review the draft pull request, test evidence, and changed files.
6. Request Copilot code review, then make the human merge decision.

## Checkpoint

You can explain why issue assignment creates a pull request while a prompt-started cloud session can remain branch-first.
