using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Angular7AspNetCore.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(
            this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response,
            int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage,
                itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            var serialised = JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter);


            response.Headers.Add("Pagination", serialised);
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
