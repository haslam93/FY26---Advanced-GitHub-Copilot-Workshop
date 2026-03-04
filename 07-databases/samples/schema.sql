-- =============================================================================
-- OntarioPermits Database Schema
-- Module 07 — Databases with GitHub Copilot
--
-- Target: SQL Server LocalDB / SQL Server 2019+
-- Copilot prompt used to generate initial structure:
-- "Generate a T-SQL schema for an enterprise permit management system.
--  Tables: Regions, Applicants, Permits, StatusHistory. Use nvarchar for
--  all string columns, datetime2 for dates, and bit for booleans."
-- =============================================================================

USE master;
GO

-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'OntarioPermits')
BEGIN
    CREATE DATABASE OntarioPermits;
END
GO

USE OntarioPermits;
GO

-- =============================================================================
-- Table: Regions
-- Lookup table for government administrative regions.
-- =============================================================================
IF OBJECT_ID('dbo.Regions', 'U') IS NOT NULL DROP TABLE dbo.Regions;
GO

CREATE TABLE dbo.Regions
(
    RegionId   INT            NOT NULL IDENTITY(1,1) CONSTRAINT PK_Regions PRIMARY KEY,
    Name       NVARCHAR(100)  NOT NULL CONSTRAINT UQ_Regions_Name UNIQUE,
    Code       NVARCHAR(10)   NOT NULL CONSTRAINT UQ_Regions_Code UNIQUE,
    IsActive   BIT            NOT NULL CONSTRAINT DF_Regions_IsActive DEFAULT (1)
);
GO

-- Seed regional data
INSERT INTO dbo.Regions (Name, Code) VALUES
    (N'Toronto',         N'TOR'),
    (N'Ottawa',          N'OTT'),
    (N'Hamilton',        N'HAM'),
    (N'London',          N'LON'),
    (N'Windsor',         N'WIN'),
    (N'Kingston',        N'KGS'),
    (N'Barrie',          N'BAR'),
    (N'Thunder Bay',     N'TBY'),
    (N'Sudbury',         N'SBY'),
    (N'North Bay',       N'NBY');
GO

-- =============================================================================
-- Table: Applicants
-- Individuals or organisations submitting permit applications.
-- =============================================================================
IF OBJECT_ID('dbo.Applicants', 'U') IS NOT NULL DROP TABLE dbo.Applicants;
GO

CREATE TABLE dbo.Applicants
(
    ApplicantId  INT            NOT NULL IDENTITY(1,1) CONSTRAINT PK_Applicants PRIMARY KEY,
    FullName     NVARCHAR(200)  NOT NULL,
    Email        NVARCHAR(320)  NOT NULL CONSTRAINT UQ_Applicants_Email UNIQUE,
    Phone        NVARCHAR(20)   NULL,
    CreatedAt    DATETIME2(7)   NOT NULL CONSTRAINT DF_Applicants_CreatedAt DEFAULT (SYSUTCDATETIME()),

    CONSTRAINT CHK_Applicants_Email CHECK (Email LIKE '%@%.%')
);
GO

CREATE INDEX IX_Applicants_Email ON dbo.Applicants (Email);
GO

-- Seed applicant data
INSERT INTO dbo.Applicants (FullName, Email, Phone) VALUES
    (N'Jane Doe',         N'jane.doe@example.com',    N'416-555-0101'),
    (N'John Smith',       N'john.smith@example.com',  N'613-555-0102'),
    (N'Acme Builders',    N'permits@acmebuild.com',   N'905-555-0103'),
    (N'City of Hamilton', N'permits@hamilton.ca',     N'905-555-0104');
GO

-- =============================================================================
-- Table: Permits
-- Core permit applications. Status drives workflow.
-- Valid statuses: PENDING, UNDER_REVIEW, APPROVED, REJECTED, CANCELLED
-- =============================================================================
IF OBJECT_ID('dbo.StatusHistory', 'U') IS NOT NULL DROP TABLE dbo.StatusHistory;
IF OBJECT_ID('dbo.Permits',       'U') IS NOT NULL DROP TABLE dbo.Permits;
GO

CREATE TABLE dbo.Permits
(
    PermitId     NVARCHAR(20)   NOT NULL CONSTRAINT PK_Permits PRIMARY KEY,
    ApplicantId  INT            NOT NULL CONSTRAINT FK_Permits_Applicants
                                    REFERENCES dbo.Applicants (ApplicantId),
    RegionId     INT            NOT NULL CONSTRAINT FK_Permits_Regions
                                    REFERENCES dbo.Regions (RegionId),
    Type         NVARCHAR(50)   NOT NULL,  -- CONSTRUCTION, RENOVATION, DEMOLITION, ELECTRICAL, PLUMBING
    Status       NVARCHAR(30)   NOT NULL CONSTRAINT DF_Permits_Status DEFAULT (N'PENDING'),
    Description  NVARCHAR(500)  NULL,
    SubmittedAt  DATETIME2(7)   NOT NULL CONSTRAINT DF_Permits_SubmittedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt    DATETIME2(7)   NOT NULL CONSTRAINT DF_Permits_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    SubmittedBy  NVARCHAR(450)  NOT NULL CONSTRAINT DF_Permits_SubmittedBy DEFAULT (SYSTEM_USER),

    CONSTRAINT CHK_Permits_Status CHECK (Status IN (
        N'PENDING', N'UNDER_REVIEW', N'APPROVED', N'REJECTED', N'CANCELLED')),
    CONSTRAINT CHK_Permits_Type CHECK (Type IN (
        N'CONSTRUCTION', N'RENOVATION', N'DEMOLITION', N'ELECTRICAL', N'PLUMBING'))
);
GO

CREATE INDEX IX_Permits_ApplicantId  ON dbo.Permits (ApplicantId);
CREATE INDEX IX_Permits_RegionId     ON dbo.Permits (RegionId);
CREATE INDEX IX_Permits_Status       ON dbo.Permits (Status);
CREATE INDEX IX_Permits_SubmittedAt  ON dbo.Permits (SubmittedAt DESC);
GO

-- Seed permit data
INSERT INTO dbo.Permits (PermitId, ApplicantId, RegionId, Type, Status, Description) VALUES
    (N'P-000001', 1, 1, N'CONSTRUCTION',  N'APPROVED',      N'Office renovation at 100 Queen St W'),
    (N'P-000002', 2, 2, N'RENOVATION',    N'UNDER_REVIEW',  N'Kitchen remodel — 45 Sparks St'),
    (N'P-000003', 3, 3, N'DEMOLITION',    N'PENDING',       N'Demolish warehouse at 500 Parkside Dr'),
    (N'P-000004', 1, 1, N'ELECTRICAL',    N'PENDING',       N'Panel upgrade — 22 Bay St'),
    (N'P-000005', 4, 4, N'PLUMBING',      N'REJECTED',      N'Water main replacement'),
    (N'P-000006', 2, 5, N'CONSTRUCTION',  N'CANCELLED',     N'New commercial build — project cancelled by applicant');
GO

-- =============================================================================
-- Table: StatusHistory
-- Audit trail of every status transition on a permit.
-- =============================================================================
CREATE TABLE dbo.StatusHistory
(
    HistoryId    INT            NOT NULL IDENTITY(1,1) CONSTRAINT PK_StatusHistory PRIMARY KEY,
    PermitId     NVARCHAR(20)   NOT NULL CONSTRAINT FK_StatusHistory_Permits
                                    REFERENCES dbo.Permits (PermitId),
    OldStatus    NVARCHAR(30)   NULL,  -- NULL = initial submission
    NewStatus    NVARCHAR(30)   NOT NULL,
    ChangedAt    DATETIME2(7)   NOT NULL CONSTRAINT DF_StatusHistory_ChangedAt DEFAULT (SYSUTCDATETIME()),
    ChangedBy    NVARCHAR(450)  NOT NULL CONSTRAINT DF_StatusHistory_ChangedBy DEFAULT (SYSTEM_USER),
    Notes        NVARCHAR(500)  NULL
);
GO

CREATE INDEX IX_StatusHistory_PermitId  ON dbo.StatusHistory (PermitId);
CREATE INDEX IX_StatusHistory_ChangedAt ON dbo.StatusHistory (ChangedAt DESC);
GO

-- Seed status history
INSERT INTO dbo.StatusHistory (PermitId, OldStatus, NewStatus, ChangedBy, Notes) VALUES
    (N'P-000001', NULL,             N'PENDING',      N'system',   N'Initial submission'),
    (N'P-000001', N'PENDING',       N'UNDER_REVIEW', N'officer1', NULL),
    (N'P-000001', N'UNDER_REVIEW',  N'APPROVED',     N'officer1', N'All documents verified'),
    (N'P-000002', NULL,             N'PENDING',      N'system',   N'Initial submission'),
    (N'P-000002', N'PENDING',       N'UNDER_REVIEW', N'officer2', NULL),
    (N'P-000005', NULL,             N'PENDING',      N'system',   N'Initial submission'),
    (N'P-000005', N'PENDING',       N'REJECTED',     N'officer1', N'Incomplete site survey'),
    (N'P-000006', NULL,             N'PENDING',      N'system',   N'Initial submission'),
    (N'P-000006', N'PENDING',       N'CANCELLED',    N'jane.doe', N'Applicant withdrew application');
GO

PRINT 'OntarioPermits schema and seed data created successfully.';
GO
