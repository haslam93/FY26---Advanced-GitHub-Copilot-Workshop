# Custom Agents

Custom agents package a specialist role, instructions, and an allowed tool set. They are useful when the same review or implementation pattern recurs.

Examples:

- testing specialist
- documentation reviewer
- migration planner
- accessibility reviewer
- release assistant

The live example in `.github/agents/workshop-reviewer.agent.md` focuses on workshop accuracy, neutral examples, and validation evidence.

Current agent configuration uses `user-invocable` and `disable-model-invocation`; the older `infer` property is retired.

Use a custom agent when the role should be repeatable. Use a normal prompt when the need is one-off.

Keep tool access narrow. A read-only reviewer should not receive write or deployment tools.
