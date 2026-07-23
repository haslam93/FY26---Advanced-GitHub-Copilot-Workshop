# Agent Selection Guide

| Situation | Recommended workflow | Why |
|---|---|---|
| You need an explanation | Ask/chat | Focused answer without implementation |
| You need to explore an approach first | Plan mode | Produces an implementation plan before changes |
| The task spans files and tools | Agent mode | Can search, edit, run, and iterate |
| You need a repeatable specialist | Custom agent | Stable role and instructions |
| You need an independent critique | Review or rubber-duck agent | Fresh context |
| Work separates into independent parts | Subagents or fleet | Context isolation and parallelism |
| The task should run on GitHub and return a PR | Cloud agent | Hosted execution and pull-request workflow |

## Escalation pattern

Start with the least autonomous workflow that fits the task. Escalate when the task requires broader search, tool use, or sustained iteration. Autonomy should increase with clarity, not replace it.
