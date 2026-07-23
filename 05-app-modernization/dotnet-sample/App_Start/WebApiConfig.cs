using System.Web.Http;

namespace LegacyWorkItemApi.App_Start
{
    /// <summary>Configures the legacy Web API 2 application.</summary>
    public static class WebApiConfig
    {
        /// <summary>Registers routes and response formatters.</summary>
        /// <param name="config">The global HTTP configuration.</param>
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}
