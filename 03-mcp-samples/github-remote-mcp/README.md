# GitHub MCP Server

The GitHub remote MCP server lets Copilot use GitHub tools without embedding a token in this repository.

## Configuration

Copy [`mcp.json`](mcp.json) into `.vscode/mcp.json`, or use the combined root configuration.

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

Complete the authentication prompt in the client. Organization policy and account permissions still apply.

## Demo prompts

```text
List the open issues in this repository and group them by label.
```

```text
Summarize pull request #12 and identify any missing validation evidence.
```

```text
Find the workflow files in this repository and explain when each one runs.
```

Start with read-only exploration. Demonstrate a write action only in a disposable repository and review the exact tool call before approval.
