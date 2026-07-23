# Exercise 01 - Customization

> **Time:** 15 minutes

## Objectives

- Observe repository and path-specific instructions.
- Invoke a reusable prompt file.
- Compare a custom agent with an agent skill.

## Steps

1. Open the repository in a supported Copilot client.
2. Ask: `Which instructions apply to demo-nodejs and how will you validate changes?`
3. Open `.github/copilot-instructions.md` and one file under `.github/instructions/`.
4. Invoke the code-review prompt on `demo-nodejs/src/task-store.js`.
5. Select `workshop-reviewer`.
6. Inspect `.github/skills/presentation-qa/SKILL.md`.

## Reflection

| Mechanism | What made it different? |
|---|---|
| Instruction | Applied stable repository guidance |
| Prompt file | Started a reusable user-invoked workflow |
| Custom agent | Changed the specialist role |
| Skill | Described a multi-step capability with completion criteria |

## Checkpoint

You can explain where each customization artifact lives and when it is loaded.
