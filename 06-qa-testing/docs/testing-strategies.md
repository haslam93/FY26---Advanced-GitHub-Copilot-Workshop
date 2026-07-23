# Testing Strategies

Use Copilot to accelerate test design, not to skip it.

| Layer | Best for | Watch for |
|---|---|---|
| Unit | Business rules and error handling | Over-mocking implementation details |
| Integration | Framework configuration and boundaries | Slow setup and shared state |
| End-to-end | Critical user journeys | Brittle selectors and excessive coverage |
| Accessibility | Semantic markup and common WCAG failures | Automated checks do not replace manual review |

## Review generated tests

- Does each test describe observable behavior?
- Can a failing assertion explain the regression?
- Are edge cases grounded in requirements?
- Is the test independent and deterministic?
- Did Copilot invent an API or requirement?

Run the smallest relevant test set while iterating, then run the full sample suite before committing.
