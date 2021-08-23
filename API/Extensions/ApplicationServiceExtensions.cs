using Microsoft.Extensions.DependencyInjection;

using Core.Interfaces;
using Infrastructure.Data;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            return services;
        }
        
    }
}