# Module 01 — Customization

[![Module](https://img.shields.io/badge/Module-01_Customization-0078d4?logo=github&logoColor=white)](.)
[![Estimated Time](https://img.shields.io/badge/Time-45_min-informational)](.)

> **What you'll learn:** How to control what context GitHub Copilot automatically receives on every request — at the repository level (shared with your team) and at the workstation level (personal). Covers all instruction file types, prompt files, agent modes, agent skills, and organization-level instructions.

---

## Where Do Instruction Files Live?

```mermaid
flowchart TB
    subgraph REPO["📁 Repo-level  (committed to git — shared with team)"]
        direction TB
        A[".github/copilot-instructions.md<br/>Always-on · All chat requests"]
        B[".github/instructions/*.instructions.md<br/>File-based · Conditional via applyTo glob"]
        C["AGENTS.md  (repo root)<br/>Always-on · Multi-agent compatible"]
        D[".claude/CLAUDE.md<br/>Always-on · Claude Code compatibility"]
    end

    subgraph WS["💻 Workstation-level  (personal — not committed)"]
        direction TB
        E["VS Code User Profile<br/>prompts/*.instructions.md<br/>File-based · Applies across ALL workspaces"]
        F["~/.claude/CLAUDE.md<br/>Personal Claude-compatible instructions"]
        G["GitHub Organization Instructions<br/>Set by org admin · Auto-discovered by VS Code"]
    end

    REPO -->|"Combined and sent to<br/>Copilot on every request"| MERGE
    WS -->|"Personal context<br/>layered on top"| MERGE
    MERGE["🤖 Copilot Chat Request"]
```

---

## Instruction Priority (Conflict Resolution)

When multiple instruction sources provide conflicting guidance, Copilot resolves them in this order:

```mermaid
flowchart LR
    P1["1️⃣ Personal<br/>(User Profile)<br/><b>Highest Priority</b>"]
    P2["2️⃣ Repository<br/>(.github/copilot-instructions.md<br/>AGENTS.md)"]
    P3["3️⃣ Organization<br/>(Admin-set)<br/><b>Lowest Priority</b>"]

    P1 -->|overrides| P2
    P2 -->|overrides| P3

    style P1 fill:#0078d4,color:#fff
    style P2 fill:#107c10,color:#fff
    style P3 fill:#767676,color:#fff
```

> All sources are **combined** and included in the context. Priority only matters when instructions **conflict**.

---

## Which Mechanism Should I Use?

```mermaid
flowchart TD
    Q1{"Does this instruction\napply to the whole team?"}
    Q2{"Is it always relevant,\nor only for certain files?"}
    Q3{"Do you use multiple\nAI agents (Claude Code, etc.)?"}
    Q4{"Is this a reusable\ntask / workflow?"}
    Q5{"Is it a personal\npreference across all projects?"}

    A1["✅ .github/copilot-instructions.md\nAlways-on, repo-scoped"]
    A2["✅ .github/instructions/*.instructions.md\nFile-based, use applyTo glob"]
    A3["✅ AGENTS.md (+ .github/copilot-instructions.md)\nRecognized by all agents"]
    A4["✅ .github/prompts/*.prompt.md\nOn-demand via VS Code prompt picker"]
    A5["✅ VS Code User Profile\nprompts/*.instructions.md\nPersonal, cross-workspace"]

    Q1 -->|Yes| Q2
    Q1 -->|No| Q5
    Q2 -->|Always relevant| Q3
    Q2 -->|Only certain files| A2
    Q3 -->|Yes| A3
    Q3 -->|No| A1
    Q4 -->|Yes| A4
    Q5 -->|Yes| A5
    Q5 -->|No - it's a task| Q4
```

---

## Contents

| Doc | What it covers |
|-----|---------------|
| [docs/always-on-instructions.md](docs/always-on-instructions.md) | `copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md` — always-on files |
| [docs/file-based-instructions.md](docs/file-based-instructions.md) | `*.instructions.md` — conditional, file-pattern-based instructions |
| [docs/prompt-files.md](docs/prompt-files.md) | `*.prompt.md` — on-demand reusable prompts |
| [docs/agent-modes.md](docs/agent-modes.md) | Ask / Edit / Agent mode comparison |
| [docs/agent-skills.md](docs/agent-skills.md) | Agent skills and `#tool:` syntax |
| [docs/org-instructions.md](docs/org-instructions.md) | Organization-level instructions |

---

## Live Examples in This Repo

The `.github/` folder contains working examples of everything covered in this module.

| File | Type | Live? |
|------|------|-------|
| [.github/copilot-instructions.md](../.github/copilot-instructions.md) | Always-on repo instruction | ✅ Active now |
| [AGENTS.md](../AGENTS.md) | Multi-agent always-on | ✅ Active now |
| [.github/instructions/csharp-standards.instructions.md](../.github/instructions/csharp-standards.instructions.md) | File-based (`applyTo: **/*.cs`) | ✅ Active now |
| [.github/instructions/test-standards.instructions.md](../.github/instructions/test-standards.instructions.md) | File-based (`applyTo: **/*Tests.cs`) | ✅ Active now |
| [.github/prompts/code-review.prompt.md](../.github/prompts/code-review.prompt.md) | Prompt file | ✅ Available in picker |
| [.github/prompts/generate-tests.prompt.md](../.github/prompts/generate-tests.prompt.md) | Prompt file | ✅ Available in picker |
| [.vscode/settings.json](../.vscode/settings.json) | Workspace-scoped settings | ✅ Active now |

> See [.github/FILES.md](../.github/FILES.md) for a quick overview of all live demo files.

---

## Try It Now

1. Open Copilot Chat (`Ctrl+Alt+I`)
2. Ask: *"What coding conventions apply to this project?"*
3. Copilot will describe the C#/.NET rules from `.github/copilot-instructions.md` — those come from this repo's instruction file.
4. Then try: click the **Attach** (📎) icon → **Prompt Files** → select `Code Review` to run a structured review.
