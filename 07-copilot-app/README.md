# Module 07 - GitHub Copilot App

> **Time:** 30 minutes
> **Goal:** Use the desktop app as a visual workspace for multiple Copilot CLI-powered sessions.

The GitHub Copilot app is a standalone desktop application for Windows, macOS, and Linux. It is built on Copilot CLI and adds a visual workspace for parallel sessions, repository worktrees, issue and pull-request workflows, and extensions.

## What the app adds

| Capability | Workshop value |
|---|---|
| Parallel isolated worktrees | Run separate tasks without mixing branches or files |
| Interactive, Plan, and Autopilot modes | Match supervision to task clarity |
| Issue and pull-request browsing | Move from GitHub context to implementation and review |
| CI and merge workflows | Inspect checks and complete a branch workflow in one place |
| Instructions, skills, MCP, and plugins | Reuse the same customization concepts as CLI and cloud agent |
| Quick chats and Chronicle | Ask side questions and learn from session history |
| Canvas extensions | Show rich task-specific views next to the conversation |
| Model and provider selection | Choose the available model that fits the task |

Business and Enterprise access can depend on the organization's Copilot CLI policy.

## App, CLI, and cloud agent

```mermaid
flowchart LR
    A[Copilot CLI engine] --> B[Copilot app visual workspace]
    A --> C[Terminal workflow]
    B --> D[Local worktrees]
    C --> D
    B --> E[GitHub issues and pull requests]
    C --> F[/delegate]
    F --> G[Cloud agent]
```

Use `/app` in Copilot CLI to launch the installed app or get the download location.

## Demo

1. Open this repository in the app.
2. Start one session to review `demo-nodejs`.
3. Start a second isolated worktree to plan a documentation change.
4. Compare Interactive, Plan, and Autopilot modes.
5. Open Chronicle and inspect reusable insights.
6. Show loaded instructions, skills, and MCP servers.

## Important status note

Cloud sandboxes in the app are public preview. Local worktrees remain the default workshop path unless the preview is explicitly enabled and approved.

## Guides

- [Worktrees and parallel sessions](docs/worktrees-and-sessions.md)
- [Customization and extensions](docs/customization-and-extensions.md)
- [Cloud sandboxes](docs/cloud-sandboxes.md)

Official reference: [GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
