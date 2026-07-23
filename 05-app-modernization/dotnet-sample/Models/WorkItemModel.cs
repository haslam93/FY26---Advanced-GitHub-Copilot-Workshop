using System;

namespace LegacyWorkItemApi
{
    /// <summary>Represents a legacy work item.</summary>
    public class WorkItemModel
    {
        /// <summary>Gets or sets the work item identifier.</summary>
        public int Id { get; set; }

        /// <summary>Gets or sets the work item title.</summary>
        public string Title { get; set; }

        /// <summary>Gets or sets the work item category.</summary>
        public string Category { get; set; }

        /// <summary>Gets or sets the current status.</summary>
        public string Status { get; set; }

        /// <summary>Gets or sets the creation date.</summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>Gets or sets optional notes.</summary>
        public string Notes { get; set; }
    }
}
