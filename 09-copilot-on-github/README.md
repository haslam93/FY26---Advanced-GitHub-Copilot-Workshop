# Module 09 — Copilot on GitHub.com

[![Module](https://img.shields.io/badge/Module-09_Copilot_on_GitHub.com-0078d4?logo=github&logoColor=white)](.)
[![Estimated Time](https://img.shields.io/badge/Time-35_min-informational)](.) [![Level](https://img.shields.io/badge/Level-Advanced-red)](.)

> **Learning objectives:** Use Copilot features that live on GitHub.com itself — Coding Agent, AI code review, and Copilot Spaces — separately from VS Code.

---

## GitHub.com Feature Architecture

```mermaid
flowchart TD
    subgraph "VS Code (Local)"
        A[Copilot Chat\nEdit / Agent Mode]
        B[Background Agent\nLocal Files]
    end

    subgraph "GitHub.com (Cloud)"
        C[Coding Agent\nIssue → PR]
        D[AI Code Review\nPR Comments]
        E[Copilot Spaces\nKnowledge Hub]
        F[Copilot Chat on\nGitHub.com]
    end

    A <-->|Push / Pull| C
    B <-->|Opens PR| C
    C -->|Creates PR| D
    D -->|Review comments| C
    E -->|Knowledge source| C
    E -->|Context| F

    style C fill:#e65100,color:#fff
    style D fill:#1565c0,color:#fff
    style E fill:#4527a0,color:#fff
```

---

## Coding Agent Lifecycle

```mermaid
flowchart LR
    A[📋 GitHub Issue\nwritten by developer] --> B[Assign to\nCopilot agent]
    B --> C[🤖 Agent reads issue\nclones repo]
    C --> D[Plans implementation\nsteps]
    D --> E[Writes code\nruns tests]
    E --> F{Tests pass?}
    F -- "❌ Fail" --> G[Agent iterates\nfixes failures]
    G --> E
    F -- "✅ Pass" --> H[Opens Draft PR\nwith description]
    H --> I[👩‍💻 Developer reviews\nApproves / Requests changes]
    I --> J[PR merged\nIssue closed]

    style A fill:#1565c0,color:#fff
    style J fill:#2e7d32,color:#fff
```

---

## AI Code Review Sequence

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant GH as GitHub.com
    participant Agent as Copilot AI Review

    Dev->>GH: Opens Pull Request
    GH->>Agent: Triggers AI review
    Agent->>Agent: Reads diff + copilot-review-instructions.md
    Agent->>GH: Posts inline PR comments
    Agent->>GH: Posts summary review comment
    Dev-->>GH: Reads comments, makes changes
    Dev->>GH: Re-requests review
    Agent->>Agent: Re-analyses updated diff
    Agent->>GH: Approves or re-comments
```

---

## Copilot Spaces Mindmap

```mermaid
mindmap
  root((Copilot Spaces))
    Knowledge Sources
      GitHub Repos
      GitHub Issues and PRs
      Code search
      Curated files
    Enterprise Use Cases
      Internal API documentation
      Architecture decision records
      Security standards and policies
      Legacy system documentation
    Access
      Shared across team
      SSO-protected
      No file uploads needed
    Integration
      Copilot Chat on GitHub.com
      MCP via GitHub Remote server
```

---

## Module Structure

```
09-copilot-on-github/
├── README.md
└── docs/
    ├── coding-agents.md         ← Coding Agent: issue → PR lifecycle
    ├── code-review.md           ← AI code review + copilot-review-instructions.md
    └── copilot-spaces.md        ← Spaces: knowledge sources + Ontario use cases
```

---

## Quick Reference

| Feature | Where | Access |
|---|---|---|
| Coding Agent | GitHub.com — Issues | Assign issue to "Copilot" |
| AI Code Review | GitHub.com — Pull Requests | Auto-triggers on PR open |
| Copilot Chat (web) | GitHub.com — any page | Click Copilot icon (top nav) |
| Copilot Spaces | GitHub.com — Spaces tab | Team / org level |

---

## Related Modules

- [Module 02 — VS Code Agents](../02-vscode-agents/README.md) — Background Agent (VS Code side)
- [Module 03 — MCP Servers](../03-mcp-samples/github-remote-mcp/README.md) — GitHub Remote MCP
- [Module 08 — Models](../08-models-context/README.md) — Model selection for Coding Agent
