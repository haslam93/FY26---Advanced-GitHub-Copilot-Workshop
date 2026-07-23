# Exercise 03 - MCP

> **Time:** 15 minutes
> **Reference:** [Module 03](../../03-mcp-samples/README.md)

## Objectives

- Inspect the configured MCP servers and tools.
- Use a read-only GitHub tool.
- Use Playwright MCP against the local Node.js demo.

## Steps

1. Open `.vscode/mcp.json`.
2. Start or authenticate the GitHub and Playwright servers in the supported client.
3. Ask GitHub MCP:

   ```text
   List this repository's open issues and group them by label. Do not modify anything.
   ```

4. Start the demo:

   ```powershell
   Set-Location demo-nodejs
   npm start
   ```

5. Ask Playwright MCP:

   ```text
   Open http://localhost:3000, add a task named "Review MCP permissions", and confirm it appears. Do not visit another host.
   ```

6. Review the tool calls and identify which were read-only and which changed local application state.

## Checkpoint

You can explain why MCP tool visibility does not replace authentication, authorization, or least-privilege configuration.
