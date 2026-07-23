# Repository and Agent Instructions

Repository instructions should describe facts that remain useful across many tasks:

- supported runtimes
- build and test commands
- architecture boundaries
- naming and error-handling conventions
- security requirements
- validation expectations

This repository demonstrates:

- `.github/copilot-instructions.md`
- `AGENTS.md`
- `.github/instructions/*.instructions.md`

Copilot CLI can also discover instruction files such as `CLAUDE.md` and `GEMINI.md` in supported locations. Do not duplicate conflicting rules across files. Keep one clear source of truth or explain how the files divide responsibility.

## Good instruction

```text
Run `npm test` after changing demo-nodejs and keep it dependency-free.
```

## Weak instruction

```text
Write excellent, modern code.
```

The good instruction is specific, verifiable, and tied to the repository.
