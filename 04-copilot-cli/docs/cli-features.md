# Copilot CLI Feature Reference

This reference reflects the interactive help available when the workshop was refreshed in July 2026. Run `/help` to verify the installed version.

## Input and navigation

| Shortcut | Purpose |
|---|---|
| `@` | Mention files |
| `#` | Mention issues and pull requests |
| `!` | Run a shell command |
| `Shift+Tab` | Switch modes, including plan mode |
| `Ctrl+Q` | Queue a prompt |
| `Ctrl+G` | Edit the prompt in `$EDITOR` |
| `Ctrl+X`, then `B` | Move the current task to the background |

## Agents and execution

| Command | Purpose |
|---|---|
| `/agent` | Browse and select custom agents |
| `/plan` | Create an implementation plan before editing |
| `/refine` | Rewrite a rough prompt for review |
| Autopilot mode | Continue locally until completion, a configured limit, or an error |
| `/fleet` | Run independent subtasks through parallel subagents |
| `/tasks` | View subagents and shell commands |
| `/delegate` | Send the session to GitHub so Copilot can create a pull request |
| `/rubber-duck` | Get an independent critique |
| `/ask` | Ask a side question without adding it to the main history |

## Code quality and repository tools

| Command | Purpose |
|---|---|
| `/diff` | Review changes in the current directory |
| `/review` | Run a code-review agent |
| `/security-review` | Analyze the current changes for security vulnerabilities |
| `/lsp` | Manage language servers |
| `/ide` | Connect to an IDE workspace |
| `/pr` | Work with pull requests for the current branch |
| `/init` | Create repository instructions |

## Customization and extensibility

| Command | Purpose |
|---|---|
| `/instructions` | View and toggle custom instructions |
| `/skills` | Manage specialized skills |
| `/plugin` | Manage plugins and marketplaces |
| `/mcp` | Manage MCP servers |
| `/env` | Show loaded instructions, MCP servers, skills, agents, hooks, plugins, LSPs, and extensions |
| `/subagents` | Configure subagent models |

## Research, history, and collaboration

| Command | Purpose |
|---|---|
| `/research` | Run a deep research investigation using GitHub and web sources |
| `/chronicle` | Analyze synchronized session history for standups, tips, usage insights, and reusable customization ideas |
| `/resume` | Switch to a previous session or task |
| `/search` | Search the current conversation timeline |
| `/rewind` | Rewind the last turn and revert its file changes |
| `/share` | Export a session or research report |
| `/remote` | Toggle remote control from GitHub web and mobile |
| `/app` | Open or promote the GitHub Copilot app visual workspace |
| `/voice` | Manage dictation transcription |

## Context and maintenance

Use `/context`, `/compact`, `/usage`, `/limits`, `/diagnose`, `/changelog`, `/version`, and `/update` to manage long-running sessions and keep the CLI current.

Copilot Memory is a public-preview capability shared across supported agent surfaces. Some CLI builds expose `/memory`; treat the command as version-dependent and verify it with `/help`.

## Experimental or version-dependent

- `/mcp search` for registry discovery
- `/every` and `/after` prompt scheduling
- `/diff` and timeline `/search` may carry experimental labeling in the current command reference
- Cloud sandboxes in the GitHub Copilot app

## Safety

- Start in a trusted directory.
- Review tool permissions and paths.
- Prefer narrow allow rules over unrestricted execution.
- Keep secrets out of prompts, logs, and committed files.
- Use `/security-review` as a focused check, not a substitute for normal security engineering.
