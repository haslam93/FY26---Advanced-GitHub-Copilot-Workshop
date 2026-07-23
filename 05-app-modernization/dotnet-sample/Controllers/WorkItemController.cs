using System;
using System.Web.Http;

namespace LegacyWorkItemApi.Controllers
{
    /// <summary>
    /// Legacy ASP.NET Web API 2 controller used as a modernization exercise.
    /// </summary>
    public class WorkItemController : ApiController
    {
        // LEGACY: Direct instantiation should become constructor injection.
        private readonly WorkItemRepository _repository = new WorkItemRepository();

        /// <summary>Returns all work items.</summary>
        /// <returns>An HTTP response containing the current work items.</returns>
        [HttpGet]
        [Route("api/work-items")]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception ex)
            {
                // LEGACY: Replace Console logging and controller-level catches with ILogger and middleware.
                Console.WriteLine("Error in GetAll: " + ex.Message);
                return InternalServerError(ex);
            }
        }

        /// <summary>Returns one work item.</summary>
        /// <param name="id">The work item identifier.</param>
        /// <returns>An HTTP response containing the work item.</returns>
        [HttpGet]
        [Route("api/work-items/{id:int}")]
        public IHttpActionResult GetById(int id)
        {
            var workItem = _repository.GetById(id);
            return workItem == null ? (IHttpActionResult)NotFound() : Ok(workItem);
        }

        /// <summary>Creates a work item.</summary>
        /// <param name="model">The work item request.</param>
        /// <returns>An HTTP response containing the new identifier.</returns>
        [HttpPost]
        [Route("api/work-items")]
        public IHttpActionResult Create([FromBody] WorkItemModel model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Title))
            {
                return BadRequest("A title is required.");
            }

            var newId = _repository.Create(model);
            return Created($"api/work-items/{newId}", new { Id = newId });
        }
    }
}
