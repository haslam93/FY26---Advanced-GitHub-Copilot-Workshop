# Copilot SQL Patterns

> **Goal:** Learn the prompt patterns that give Copilot enough context to generate correct, safe, and performant T-SQL for the OntarioPermits schema.

---

## The Golden Rule

Always give Copilot three things:

1. **What you want** (the business requirement in plain English)
2. **Which tables/columns** are involved (or let Copilot read them from IntelliSense)
3. **Any constraints** (performance, nullability, security)

---

## Pattern 1 — Natural Language to SELECT

**Prompt template:**
```text
Using the OntarioPermits database, write a T-SQL SELECT query to [requirement].
Target SQL Server 2019+.
```

**Example:**
```text
Using the OntarioPermits database, write a T-SQL SELECT query to find all permits
submitted in the last 7 days that are still PENDING. Show the permit ID, applicant
full name, region, and number of days pending. Order by days pending descending.
```

**What Copilot produces:**

```sql
SELECT
    p.PermitId,
    a.FullName      AS ApplicantName,
    r.Name          AS Region,
    DATEDIFF(DAY, p.SubmittedAt, SYSUTCDATETIME()) AS DaysPending
FROM        dbo.Permits    p
INNER JOIN  dbo.Applicants a ON a.ApplicantId = p.ApplicantId
INNER JOIN  dbo.Regions    r ON r.RegionId    = p.RegionId
WHERE       p.Status      = N'PENDING'
  AND       p.SubmittedAt >= DATEADD(DAY, -7, SYSUTCDATETIME())
ORDER BY    DaysPending DESC;
```

---

## Pattern 2 — Explain a Query

Copilot is excellent at translating complex SQL to plain English for non-developer stakeholders.

**Prompt:**
```text
Explain this T-SQL query in plain English suitable for a non-developer business analyst.
Describe what data it returns, what filters it applies, and how it groups or sorts results.

[paste query here]
```

---

## Pattern 3 — Refactor for Safety (SQL Injection)

**Prompt:**
```text
This stored procedure uses dynamic SQL with string concatenation.
Rewrite it to use parameterised queries. Preserve the original logic exactly.
Add SET NOCOUNT ON, TRY/CATCH, and parameter validation with THROW.
```

**Before:**
```sql
-- LEGACY: vulnerable to SQL injection
SET @SQL = 'SELECT * FROM Permits WHERE Status = ''' + @Status + ''''
EXEC(@SQL)
```

**After (Copilot-generated):**
```sql
-- Safe: parameterised
SELECT * FROM dbo.Permits WHERE Status = @Status;
```

---

## Pattern 4 — Add an Index

**Prompt:**
```text
This query is running slowly on the Permits table which has 2 million rows.
Suggest the most impactful index or indexes to add. Explain why.
Provide the CREATE INDEX statements.
```

**Copilot output pattern:**
```sql
-- Covering index for status + date range queries (Queries 01, 06, 08)
CREATE NONCLUSTERED INDEX IX_Permits_Status_SubmittedAt
ON dbo.Permits (Status, SubmittedAt DESC)
INCLUDE (ApplicantId, RegionId, Type);
```

---

## Pattern 5 — Generate a Stored Procedure

**Prompt:**
```text
Create a stored procedure dbo.usp_GetPermitsByApplicant that:
- Accepts @ApplicantId INT (required) and @Status NVARCHAR(30) (optional)
- Validates @ApplicantId > 0
- Returns all matching permits with region and applicant details
- Uses TRY/CATCH
- Follows enterprise naming convention (usp_ prefix)
```

---

## Pattern 6 — Schema Migration

**Prompt:**
```text
Write a safe, idempotent T-SQL migration script to add a column ExternalReference
NVARCHAR(100) NULL to dbo.Permits. Check that the column doesn't already exist
before adding it. Add an index on the new column.
```

**Copilot output:**
```sql
IF NOT EXISTS (
    SELECT 1 FROM sys.columns
    WHERE object_id = OBJECT_ID(N'dbo.Permits')
      AND name      = N'ExternalReference'
)
BEGIN
    ALTER TABLE dbo.Permits ADD ExternalReference NVARCHAR(100) NULL;

    CREATE NONCLUSTERED INDEX IX_Permits_ExternalReference
    ON dbo.Permits (ExternalReference)
    WHERE ExternalReference IS NOT NULL;

    PRINT 'Column ExternalReference added to dbo.Permits.';
END
ELSE
BEGIN
    PRINT 'Column ExternalReference already exists — skipping.';
END
```

---

## Pattern 7 — Test Data Generation

**Prompt:**
```text
Generate 100 rows of realistic test data for the dbo.Permits table.
Use realistic city names for description, realistic permit types, and random
statuses weighted toward PENDING (40%), APPROVED (30%), UNDER_REVIEW (20%),
REJECTED (8%), CANCELLED (2%).
Use ApplicantId values between 1–4 and RegionId values between 1–10.
```

---

## Security Checklist

Before committing any Copilot-generated SQL, verify:

| Check | Question |
|---|---|
| No dynamic SQL | Is `EXEC(@SQL)` avoided? |
| Parameterised | Are all user inputs bound as `@Parameters`? |
| Least privilege | Does the procedure need `db_owner` or just `db_datareader`? |
| No `SELECT *` | Are only required columns returned? |
| Error handling | Is `TRY/CATCH` present? |
| No sensitive data in error messages | Does `THROW` expose internal table names to end users? |

---

## Enterprise Context Prompts

These work especially well with the OntarioPermits schema:

```text
"Generate a query for a weekly management report: number of permits received,
approved, and rejected per region for the current week."

"Write a T-SQL VIEW vw_PermitSummary that joins Permits, Applicants, Regions,
and shows the latest status change from StatusHistory."

"Generate an INSERT statement for a new permit that automatically generates
the PermitId as P-{6-digit padded sequence number} using the highest existing ID."
```

---

## Related

- [mssql Extension Setup](mssql-extension.md)
- [Sample Queries](../samples/queries.sql)
- [Stored Procedures](../samples/stored-procedures.sql)
- [sql-query prompt file](../../.github/prompts/sql-query.prompt.md)
