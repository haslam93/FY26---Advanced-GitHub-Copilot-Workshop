# Module 04 - GitHub Copilot CLI

> **Time:** 45 minutes
> **Goal:** Use the current `copilot` terminal agent for planning, implementation, review, research, parallel work, and session management.

GitHub Copilot CLI is the standalone `copilot` command, not the retired `gh copilot suggest` and `gh copilot explain` extension workflow.

## Start here

```powershell
copilot --version
copilot
```

Inside the interactive session:

```text
/help
/env
/model
```

The command set evolves quickly. Use `/help`, `/changelog`, and `/version` during delivery rather than relying only on screenshots.

## Core workflow

```mermaid
flowchart LR
    A[Describe the outcome] --> B[/plan or Shift+Tab]
    B --> C[Review the plan]
    C --> D[Autopilot mode or guided execution]
    D --> E[/diff and tests]
    E --> F[/rubber-duck or /review]
    F --> G[Commit, share, or /delegate]
```

## Feature map

| Area | Current commands and features |
|---|---|
| Plan and execute | `/plan`, `/refine`, Autopilot mode, `/fleet`, `/tasks` |
| Independent review | `/rubber-duck`, `/review`, `/security-review`, `/ask` |
| Research | `/research`, GitHub search, web sources |
| Repository context | `/init`, `/instructions`, Copilot Memory, `/lsp`, `/ide` |
| Extensions | `/skills`, `/plugin`, `/mcp`, custom agents with `/agent` |
| GitHub workflows | `/pr`, `/delegate`, issue and PR mentions with `#` |
| Sessions | `/chronicle`, `/resume`, `/rename`, `/search`, `/rewind`, `/share` |
| Remote and visual work | `/remote`, `/app`, voice mode with `/voice` |
| Operations | `/diff`, `/usage`, `/context`, `/compact`, `/diagnose`, `/update` |

## Three standout demos

### Rubber duck

`/rubber-duck` asks an independent critic to challenge the current plan or implementation. Use it before a risky change or when the main agent appears stuck.

### Chronicle

`/chronicle` analyzes synchronized session history for standups, usage insights, instruction improvements, and reusable skill ideas. Pair it with `/resume`, `/search`, and `/share`.

### Fleet

`/fleet` delegates independent subtasks to parallel subagents. Use it only when the work genuinely separates; a sequential task gains overhead rather than speed.

## Guided exercise

Open [`demo-nodejs/`](../demo-nodejs/) and try:

```text
/plan Add an open/completed filter to the task board with tests.
```

Then:

```text
/rubber-duck
```

Finally:

```text
/diff
```

## References

- [Using GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [CLI feature reference](docs/cli-features.md)
- [Fleet and subagents](docs/fleet.md)
- [Portable demo script](examples/cli-demos.md)

> **Version note:** Autopilot is a mode and `--autopilot` option. Some CLI builds also expose an `/autopilot` toggle. Copilot Memory is public preview, and some builds expose `/memory`. Always verify with `/help`.
