# Context Management

Context quality usually matters more than context quantity.

## High-signal context

- current requirements and acceptance criteria
- repository instructions
- files directly involved in the change
- build and test commands
- relevant errors and logs

## Low-signal context

- unrelated generated files
- old conversation branches
- large folders attached "just in case"
- copied documentation that the agent can search directly

## Practical techniques

- Ask Copilot to summarize its understanding before a risky edit.
- Use file mentions and selections for precise changes.
- Use custom agents or skills for repeatable specialist context.
- Use isolated subagents for independent research or review.
- In Copilot CLI, use `/context`, `/compact`, `/chronicle`, and `/resume` to inspect or continue session history.
