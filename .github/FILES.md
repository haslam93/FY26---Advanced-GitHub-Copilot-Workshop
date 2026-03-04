# .github — Copilot Instruction & Prompt Files

> **These files are active on this repository right now.**
>
> When you open this repo in VS Code with GitHub Copilot enabled, these instruction and prompt files automatically apply to every chat request. They are not just examples — they are working artifacts.
>
> **Deep-dive explanation → [01-customization/README.md](../01-customization/README.md)**

---

## What's in here

| File | Type | What it does |
|------|------|-------------|
| [`copilot-instructions.md`](copilot-instructions.md) | Always-on instruction | Applied to every chat request in this workspace. Defines C#/.NET coding conventions. |
| [`AGENTS.md`](../AGENTS.md) | Always-on (multi-agent) | Same always-on scope, but recognized by Claude Code, Copilot and other agents. |
| [`prompts/code-review.prompt.md`](prompts/code-review.prompt.md) | Prompt file | Opens in VS Code prompt picker — run a structured code review on selected code. |
| [`prompts/generate-tests.prompt.md`](prompts/generate-tests.prompt.md) | Prompt file | Generates xUnit + Moq tests for a selected C# class. |
| [`prompts/explain-legacy.prompt.md`](prompts/explain-legacy.prompt.md) | Prompt file | Explains legacy .NET Framework code and suggests modern equivalents. |
| [`prompts/sql-query.prompt.md`](prompts/sql-query.prompt.md) | Prompt file | Generates or optimises a SQL query against the OntarioPermits schema. |
| [`prompts/modernize-dotnet.prompt.md`](prompts/modernize-dotnet.prompt.md) | Prompt file | Guides incremental migration from .NET Framework to .NET 8. |

To use a prompt file: open Copilot Chat → click the **Attach** (paperclip) icon → **Prompt Files** → select from the list.

---

*Want to understand how these work? → [Module 01: Customization](../01-customization/README.md)*
