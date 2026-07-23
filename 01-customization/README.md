# Module 01 - Customization

> **Time:** 45 minutes
> **Goal:** Make Copilot consistently follow repository conventions and expose repeatable workflows through instructions, prompt files, custom agents, and skills.

## Customization map

| Mechanism | Use it for | Repository example |
|---|---|---|
| Repository instructions | Stable rules that apply broadly | [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) |
| Path-specific instructions | Rules for matching files | [`.github/instructions/`](../.github/instructions/) |
| Agent instruction files | Cross-agent project guidance | [`AGENTS.md`](../AGENTS.md) |
| Prompt files | Reusable, user-invoked workflows | [`.github/prompts/`](../.github/prompts/) |
| Custom agents | Named specialist personas with focused tools and instructions | [`.github/agents/`](../.github/agents/) |
| Skills | Packaged instructions, scripts, and resources for a repeatable capability | [`.github/skills/`](../.github/skills/) |
| Hooks | Deterministic lifecycle commands for checks and policy | `.github/hooks/*.json` |
| Plugins | Installable bundles of agents, skills, hooks, MCP, or LSP configuration | Managed by the current Copilot surface |
| MCP servers | External tools and live systems | [Module 03](../03-mcp-samples/README.md) |

Support varies by Copilot surface and version. Prompt files remain IDE-oriented and preview. Hooks are supported in the cloud agent and CLI, with IDE support still version-dependent.

## Design principles

1. Keep stable rules in instructions, not in every prompt.
2. Scope rules as narrowly as possible.
3. Prefer examples and validation commands over vague adjectives.
4. Keep prompt files task-oriented and reviewable.
5. Give custom agents a clear role and minimal tool set.
6. Keep skills self-contained and document required dependencies.
7. Never put secrets or private data in customization files.
8. Inspect skills and plugins before enabling their scripts or tools.

## Live exercise

1. Open Copilot Chat or Copilot CLI in this repository.
2. Ask: `What instructions apply to this project?`
3. Run the code-review prompt file.
4. Select the workshop reviewer custom agent.
5. Inspect the presentation QA skill.

## Guides

- [Repository and agent instructions](docs/always-on-instructions.md)
- [Path-specific instructions](docs/file-based-instructions.md)
- [Prompt files](docs/prompt-files.md)
- [Custom agents](docs/agent-modes.md)
- [Agent skills](docs/agent-skills.md)
- [Organization guidance](docs/org-instructions.md)
