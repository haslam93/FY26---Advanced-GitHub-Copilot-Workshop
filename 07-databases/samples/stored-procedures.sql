-- =============================================================================
-- OntarioPermits — Stored Procedures
-- Module 07 — Databases with GitHub Copilot
--
-- Demonstrates Copilot's before/after stored procedure refactoring.
-- Each procedure includes the Copilot prompt that generated the improvement.
-- =============================================================================

USE OntarioPermits;
GO

-- =============================================================================
-- BEFORE: Legacy procedure — security and performance issues
-- (This is what legacy enterprise systems typically look like)
--
-- Issues flagged by Copilot:
--   1. Dynamic SQL string concatenation → SQL injection risk
--   2. No parameter validation
--   3. No SET NOCOUNT ON → extra network round-trips
--   4. No error handling
--   5. Uses old-style JOIN syntax (implicit cross join)
-- =============================================================================
-- NOTE: Do not run this LEGACY version in production. It is for illustration only.
-- It is commented out to prevent accidental execution.
--
-- CREATE PROCEDURE dbo.usp_GetPermits_LEGACY
--     @Status NVARCHAR(30),
--     @Region NVARCHAR(100)
-- AS
-- BEGIN
--     DECLARE @SQL NVARCHAR(MAX)
--
--     -- LEGACY: SQL injection! @Status and @Region are concatenated directly.
--     SET @SQL = 'SELECT * FROM Permits, Regions WHERE Permits.RegionId = Regions.RegionId'
--     IF @Status != ''
--         SET @SQL = @SQL + ' AND Status = ''' + @Status + ''''
--     IF @Region != ''
--         SET @SQL = @SQL + ' AND Regions.Name = ''' + @Region + ''''
--
--     EXEC(@SQL)
-- END
-- =============================================================================

-- =============================================================================
-- AFTER: Refactored with Copilot
--
-- Copilot prompt used:
-- "Rewrite this stored procedure to:
--  1. Remove dynamic SQL — use parameterised query with CASE logic instead
--  2. Add parameter validation with THROW
--  3. Add SET NOCOUNT ON
--  4. Add TRY/CATCH with RAISERROR
--  5. Use explicit INNER JOIN syntax
--  6. Add XML documentation comments
--  7. Return only needed columns, not SELECT *"
-- =============================================================================
CREATE OR ALTER PROCEDURE dbo.usp_GetPermits
    @Status  NVARCHAR(30)  = NULL,   -- Optional filter: PENDING, APPROVED, etc.
    @Region  NVARCHAR(100) = NULL    -- Optional filter: region name
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate Status if supplied
    IF @Status IS NOT NULL AND @Status NOT IN (
        N'PENDING', N'UNDER_REVIEW', N'APPROVED', N'REJECTED', N'CANCELLED')
    BEGIN
        THROW 50001, 'Invalid Status value. Must be one of: PENDING, UNDER_REVIEW, APPROVED, REJECTED, CANCELLED.', 1;
    END

    BEGIN TRY
        SELECT
            p.PermitId,
            a.FullName      AS ApplicantName,
            a.Email,
            r.Name          AS Region,
            p.Type,
            p.Status,
            p.Description,
            p.SubmittedAt,
            p.UpdatedAt
        FROM        dbo.Permits    p
        INNER JOIN  dbo.Applicants a ON a.ApplicantId = p.ApplicantId
        INNER JOIN  dbo.Regions    r ON r.RegionId    = p.RegionId
        WHERE
            (@Status IS NULL OR p.Status = @Status)
            AND (@Region IS NULL OR r.Name = @Region)
        ORDER BY    p.SubmittedAt DESC;
    END TRY
    BEGIN CATCH
        THROW;  -- Re-raise with original error for caller to handle
    END CATCH
END;
GO

-- Usage examples:
EXEC dbo.usp_GetPermits;                                   -- All permits
EXEC dbo.usp_GetPermits @Status = N'PENDING';              -- Pending only
EXEC dbo.usp_GetPermits @Region = N'Toronto';              -- Toronto only
EXEC dbo.usp_GetPermits @Status = N'APPROVED', @Region = N'Ottawa';
GO

-- =============================================================================
-- Procedure 2: Transition permit status with full audit trail
--
-- Copilot prompt:
-- "Write a stored procedure usp_TransitionPermitStatus that:
--  1. Accepts PermitId, NewStatus, ChangedBy, Notes
--  2. Validates that PermitId exists
--  3. Validates NewStatus is a valid value
--  4. Validates the state transition is allowed (see transition table)
--  5. Updates Permits.Status and Permits.UpdatedAt in a transaction
--  6. Inserts a row into StatusHistory
--  7. Rolls back and rethrows on any error
--
-- Valid transitions:
--   PENDING      → UNDER_REVIEW, CANCELLED
--   UNDER_REVIEW → APPROVED, REJECTED, PENDING
--   APPROVED     → (none — terminal)
--   REJECTED     → PENDING  (allow resubmission)
--   CANCELLED    → (none — terminal)"
-- =============================================================================
CREATE OR ALTER PROCEDURE dbo.usp_TransitionPermitStatus
    @PermitId  NVARCHAR(20),
    @NewStatus NVARCHAR(30),
    @ChangedBy NVARCHAR(450) = NULL,
    @Notes     NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Guard: required parameters
    IF @PermitId  IS NULL THROW 50010, '@PermitId is required.',  1;
    IF @NewStatus IS NULL THROW 50011, '@NewStatus is required.', 1;

    DECLARE @CurrentStatus NVARCHAR(30);

    SELECT @CurrentStatus = Status
    FROM   dbo.Permits
    WHERE  PermitId = @PermitId;

    IF @CurrentStatus IS NULL
        THROW 50012, 'Permit not found.', 1;

    -- Validate target status
    IF @NewStatus NOT IN (N'PENDING', N'UNDER_REVIEW', N'APPROVED', N'REJECTED', N'CANCELLED')
        THROW 50013, 'Invalid NewStatus value.', 1;

    -- Validate transition is allowed
    IF NOT (
           (@CurrentStatus = N'PENDING'      AND @NewStatus IN (N'UNDER_REVIEW', N'CANCELLED'))
        OR (@CurrentStatus = N'UNDER_REVIEW' AND @NewStatus IN (N'APPROVED', N'REJECTED', N'PENDING'))
        OR (@CurrentStatus = N'REJECTED'     AND @NewStatus = N'PENDING')
    )
    BEGIN
        DECLARE @Msg NVARCHAR(200) =
            N'Invalid transition: ' + @CurrentStatus + N' → ' + @NewStatus;
        THROW 50014, @Msg, 1;
    END

    BEGIN TRANSACTION;
    BEGIN TRY

        -- Update permit status
        UPDATE dbo.Permits
        SET    Status    = @NewStatus,
               UpdatedAt = SYSUTCDATETIME()
        WHERE  PermitId  = @PermitId;

        -- Write audit record
        INSERT INTO dbo.StatusHistory (PermitId, OldStatus, NewStatus, ChangedBy, Notes)
        VALUES (@PermitId, @CurrentStatus, @NewStatus,
                ISNULL(@ChangedBy, SYSTEM_USER), @Notes);

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- Usage examples:
EXEC dbo.usp_TransitionPermitStatus
    @PermitId  = N'P-000003',
    @NewStatus = N'UNDER_REVIEW',
    @ChangedBy = N'officer2',
    @Notes     = N'Documents received — starting review';
GO

EXEC dbo.usp_TransitionPermitStatus
    @PermitId  = N'P-000003',
    @NewStatus = N'APPROVED',
    @ChangedBy = N'officer2',
    @Notes     = N'All checks passed';
GO
