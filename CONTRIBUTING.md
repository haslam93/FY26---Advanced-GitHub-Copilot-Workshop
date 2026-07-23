# Contributing

## Content rules

- Use organization-neutral, synthetic examples.
- Do not add customer names, internal URLs, credentials, or screenshots containing private data.
- Link version-sensitive claims to current official documentation.
- Label preview or experimental features.
- Use **Cloud agent** for the current GitHub-hosted agent name.
- Do not reintroduce the retired database module.
- Update both repository content and `generate-presentation.js` when a module changes.

## Validation

```powershell
npm install
npm test
npm run build:slides:office
dotnet test 06-qa-testing\csharp-unit-tests
```

For Playwright changes:

```powershell
Set-Location 06-qa-testing\playwright-samples
npm install
npx playwright install chromium
npm test
```

Before opening a pull request:

- review all Markdown links
- search for customer references and database-module content
- regenerate the PowerPoint
- extract and review slide text
- render every slide and inspect it visually
- confirm no generated artifacts or dependencies are committed

## Writing style

- Address the reader directly.
- Prefer short procedures and comparison tables.
- Use commands that run on the stated platform.
- Explain safety boundaries for agents, MCP, plugins, skills, hooks, and automation.
- Avoid static model rankings or pricing claims that will become stale.
