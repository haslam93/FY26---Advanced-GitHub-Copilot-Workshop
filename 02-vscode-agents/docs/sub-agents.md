# Subagents

Subagents receive an isolated task and context. They are useful for independent research, review, or implementation work that does not require constant coordination with the main agent.

## Good delegation

```text
Review only demo-nodejs/src for correctness. Do not edit files. Return high-confidence findings with file and line references.
```

## Poor delegation

```text
Help with the app.
```

A good subagent prompt includes:

- full scope
- expected output
- constraints
- relevant paths
- whether edits are allowed
- validation expectations

Do not send several agents to edit the same files. Use parallel subagents only when their ownership is independent.
