# Fleet, Subagents, and Autopilot

These features solve different problems:

| Feature | Primary value |
|---|---|
| Custom agent | Repeatable specialist behavior |
| Subagent | Isolated context for one delegated task |
| `/fleet` | Parallel execution of independent tasks |
| Autopilot mode | Persistent local autonomous execution |
| `/delegate` | Move work to GitHub and create a pull request |

## Good fleet tasks

- Review unrelated modules in parallel.
- Generate tests for independent components.
- Research separate technology choices.
- Run documentation and code checks that do not edit the same files.

## Poor fleet tasks

- A migration where every step depends on the previous step.
- Several tasks that edit the same file.
- A small change where delegation overhead exceeds the work.

## Demo prompt

```text
/fleet

Review the Node.js demo in parallel:
1. One subagent checks API correctness.
2. One subagent checks accessibility.
3. One subagent checks test gaps.

Do not edit files. Return one prioritized report.
```

Then ask:

```text
Implement only the high-confidence findings, run the tests, and use /rubber-duck before finishing.
```

Use `/tasks` to inspect active work. Use `/subagents` and `/model` when you need to control model selection.
