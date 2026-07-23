using Microsoft.Extensions.Logging;
using Moq;
using WorkshopTasks;
using Xunit;

namespace WorkshopTasksTests;

/// <summary>Tests <see cref="WorkItemService"/>.</summary>
public sealed class WorkItemServiceTests
{
    private readonly Mock<IWorkItemRepository> _repository = new();
    private readonly WorkItemService _service;

    /// <summary>Initializes the test fixture.</summary>
    public WorkItemServiceTests()
    {
        var logger = new Mock<ILogger<WorkItemService>>();
        _service = new WorkItemService(_repository.Object, logger.Object);
    }

    /// <summary>Verifies that a valid request creates an open work item.</summary>
    [Fact]
    public async Task SubmitAsync_ValidRequest_ReturnsOpenWorkItem()
    {
        // Arrange
        var request = new WorkItemRequest("DEMO-1", "Add a keyboard shortcut");
        _repository.Setup(repository => repository.ExistsAsync(
                request.Reference,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);
        _repository.Setup(repository => repository.SaveAsync(
                It.IsAny<WorkItem>(),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        // Act
        var result = await _service.SubmitAsync(request);

        // Assert
        Assert.Equal(WorkItemStatus.Open, result.Status);
        Assert.Equal(8, result.Id.Length);
    }

    /// <summary>Verifies that duplicate references are rejected.</summary>
    [Fact]
    public async Task SubmitAsync_DuplicateReference_ThrowsInvalidOperationException()
    {
        // Arrange
        var request = new WorkItemRequest("DEMO-1", "Add a keyboard shortcut");
        _repository.Setup(repository => repository.ExistsAsync(
                request.Reference,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        // Act
        var action = () => _service.SubmitAsync(request);

        // Assert
        await Assert.ThrowsAsync<InvalidOperationException>(action);
    }

    /// <summary>Verifies that missing work items return no status.</summary>
    [Fact]
    public async Task GetStatusAsync_UnknownId_ReturnsNull()
    {
        // Arrange
        _repository.Setup(repository => repository.FindByIdAsync(
                "UNKNOWN",
                It.IsAny<CancellationToken>()))
            .ReturnsAsync((WorkItem?)null);

        // Act
        var status = await _service.GetStatusAsync("UNKNOWN");

        // Assert
        Assert.Null(status);
    }

    /// <summary>Verifies that an open work item can be cancelled.</summary>
    [Fact]
    public async Task CancelAsync_OpenWorkItem_ReturnsTrue()
    {
        // Arrange
        var workItem = new WorkItem
        {
            Id = "ABC12345",
            Reference = "DEMO-2",
            Title = "Improve the empty state",
            Status = WorkItemStatus.Open
        };
        _repository.Setup(repository => repository.FindByIdAsync(
                workItem.Id,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(workItem);
        _repository.Setup(repository => repository.UpdateAsync(
                workItem,
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        // Act
        var result = await _service.CancelAsync(workItem.Id);

        // Assert
        Assert.True(result);
        Assert.Equal(WorkItemStatus.Cancelled, workItem.Status);
    }
}
