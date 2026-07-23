using Microsoft.Extensions.Logging;

namespace WorkshopTasks;

/// <summary>Defines the lifecycle states of a work item.</summary>
public enum WorkItemStatus
{
    /// <summary>The work item is ready to be started.</summary>
    Open,

    /// <summary>The work item is finished.</summary>
    Completed,

    /// <summary>The work item was cancelled.</summary>
    Cancelled
}

/// <summary>Represents a stored work item.</summary>
public sealed class WorkItem
{
    /// <summary>Gets or sets the identifier.</summary>
    public required string Id { get; init; }

    /// <summary>Gets or sets the external reference.</summary>
    public required string Reference { get; init; }

    /// <summary>Gets or sets the title.</summary>
    public required string Title { get; init; }

    /// <summary>Gets or sets the current status.</summary>
    public WorkItemStatus Status { get; set; }
}

/// <summary>Describes a request to create a work item.</summary>
/// <param name="Reference">The caller-provided reference.</param>
/// <param name="Title">The work item title.</param>
public sealed record WorkItemRequest(string Reference, string Title);

/// <summary>Describes the result of creating a work item.</summary>
/// <param name="Id">The generated work item identifier.</param>
/// <param name="Status">The initial status.</param>
public sealed record WorkItemResult(string Id, WorkItemStatus Status);

/// <summary>Defines persistence operations required by <see cref="WorkItemService"/>.</summary>
public interface IWorkItemRepository
{
    /// <summary>Checks whether a reference already exists.</summary>
    Task<bool> ExistsAsync(string reference, CancellationToken cancellationToken);

    /// <summary>Saves a work item.</summary>
    Task<bool> SaveAsync(WorkItem workItem, CancellationToken cancellationToken);

    /// <summary>Finds a work item by identifier.</summary>
    Task<WorkItem?> FindByIdAsync(string id, CancellationToken cancellationToken);

    /// <summary>Updates a work item.</summary>
    Task<bool> UpdateAsync(WorkItem workItem, CancellationToken cancellationToken);
}

/// <summary>Coordinates work item creation and lifecycle changes.</summary>
public sealed class WorkItemService
{
    private readonly IWorkItemRepository _repository;
    private readonly ILogger<WorkItemService> _logger;

    /// <summary>Initializes a new service instance.</summary>
    public WorkItemService(IWorkItemRepository repository, ILogger<WorkItemService> logger)
    {
        ArgumentNullException.ThrowIfNull(repository);
        ArgumentNullException.ThrowIfNull(logger);
        _repository = repository;
        _logger = logger;
    }

    /// <summary>Creates a work item.</summary>
    public async Task<WorkItemResult> SubmitAsync(
        WorkItemRequest request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        if (string.IsNullOrWhiteSpace(request.Reference) || string.IsNullOrWhiteSpace(request.Title))
        {
            throw new ArgumentException("Reference and title are required.", nameof(request));
        }

        if (await _repository.ExistsAsync(request.Reference, cancellationToken))
        {
            throw new InvalidOperationException($"Reference '{request.Reference}' already exists.");
        }

        var workItem = new WorkItem
        {
            Id = Guid.NewGuid().ToString("N")[..8].ToUpperInvariant(),
            Reference = request.Reference,
            Title = request.Title,
            Status = WorkItemStatus.Open
        };

        if (!await _repository.SaveAsync(workItem, cancellationToken))
        {
            throw new IOException("Failed to save the work item.");
        }

        _logger.LogInformation("Created work item {WorkItemId}", workItem.Id);
        return new WorkItemResult(workItem.Id, workItem.Status);
    }

    /// <summary>Returns the current status for a work item.</summary>
    public async Task<WorkItemStatus?> GetStatusAsync(
        string id,
        CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(id);
        return (await _repository.FindByIdAsync(id, cancellationToken))?.Status;
    }

    /// <summary>Cancels an open work item.</summary>
    public async Task<bool> CancelAsync(
        string id,
        CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(id);

        var workItem = await _repository.FindByIdAsync(id, cancellationToken);
        if (workItem is null || workItem.Status != WorkItemStatus.Open)
        {
            return false;
        }

        workItem.Status = WorkItemStatus.Cancelled;
        return await _repository.UpdateAsync(workItem, cancellationToken);
    }
}
