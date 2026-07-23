# Model Selection Guide

Use a simple escalation strategy:

1. Start with the default model for routine work.
2. Switch to a faster model when latency matters more than deep reasoning.
3. Switch to a stronger reasoning model for architecture, debugging, or broad refactors.
4. Use a second model or the rubber-duck agent for an independent critique.
5. Return to the default when the difficult step is complete.

Evaluate the result, not the brand:

- correctness
- tool use
- latency
- adherence to instructions
- quality of explanations
- request consumption under the active plan

Avoid claims such as "model X is always best." Task shape, product surface, policy, and current model versions all matter.
