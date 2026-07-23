# Playwright MCP

Playwright MCP gives the agent a browser tool for inspection and interaction.

## Configuration

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--browser", "msedge"]
    }
  }
}
```

## Safe demo

1. Start the simple app with `cd demo-nodejs && npm start`.
2. Ask Agent mode to open `http://localhost:3000`.
3. Add a task and verify it appears.
4. Ask the agent to recommend stable role- and label-based Playwright locators.

Example:

```text
Use Playwright MCP to open http://localhost:3000, add a task called "Review the workshop", and confirm it appears. Do not navigate to any other host.
```

Browser state may contain sensitive information. Use a dedicated profile or isolated browser for demonstrations.
