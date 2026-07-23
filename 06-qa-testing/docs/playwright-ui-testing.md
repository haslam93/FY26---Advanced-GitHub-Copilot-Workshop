# Playwright UI Testing with MCP

Playwright MCP lets an agent inspect a running page and use the browser as a tool. The Playwright test runner remains responsible for repeatable automated tests.

## Setup

```bash
cd 06-qa-testing/playwright-samples
npm install
npx playwright install chromium
npm test
```

## Recommended flow

1. Start the sample or let Playwright's `webServer` configuration start it.
2. Ask Agent mode to use Playwright MCP to inspect labels, roles, and page states.
3. Generate tests with role- or label-based locators.
4. Run the tests and review traces or screenshots when they fail.
5. Keep browser permissions and target URLs constrained to the demo environment.

Example:

```text
Use Playwright MCP to submit a work item, search for W-000001, and recommend stable locators. Then update only the relevant test file.
```
