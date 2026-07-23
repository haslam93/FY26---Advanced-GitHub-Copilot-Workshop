using System;
using System.Collections.Generic;
using System.Linq;

namespace LegacyWorkItemApi
{
    /// <summary>
    /// Stores work items in memory.
    /// LEGACY: This synchronous, stateful repository exists only to demonstrate modernization patterns.
    /// </summary>
    public class WorkItemRepository
    {
        private static readonly List<WorkItemModel> WorkItems = new List<WorkItemModel>
        {
            new WorkItemModel
            {
                Id = 1,
                Title = "Document the release process",
                Category = "Documentation",
                Status = "Open",
                CreatedDate = DateTime.UtcNow.AddDays(-2)
            }
        };

        /// <summary>Returns all work items.</summary>
        /// <returns>A mutable list of work items.</returns>
        public List<WorkItemModel> GetAll()
        {
            return WorkItems.ToList();
        }

        /// <summary>Returns a work item by identifier.</summary>
        /// <param name="id">The work item identifier.</param>
        /// <returns>The work item, or null when it does not exist.</returns>
        public WorkItemModel GetById(int id)
        {
            return WorkItems.FirstOrDefault(item => item.Id == id);
        }

        /// <summary>Creates a work item.</summary>
        /// <param name="model">The work item to create.</param>
        /// <returns>The new identifier.</returns>
        public int Create(WorkItemModel model)
        {
            model.Id = WorkItems.Count == 0 ? 1 : WorkItems.Max(item => item.Id) + 1;
            model.Status = "Open";
            model.CreatedDate = DateTime.UtcNow;
            WorkItems.Add(model);
            return model.Id;
        }
    }
}
