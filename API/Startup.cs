using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;
using Infrastructure.Identity;



namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration configuration)
        {      
            _config = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
         services.AddAutoMapper(typeof(MappingProfiles));      
         services.AddDbContext<StoreContext>(x =>
                x.UseSqlite(_config.GetConnectionString("DefaultConnection")));

          services.AddDbContext<AppIdentityDbContext>(x =>
                x.UseSqlite(_config.GetConnectionString("IdentityConnection")));
 
         services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions
                .Parse(_config.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddControllers();
            services.Configure<ApiBehaviorOptions>(options => 
            options.InvalidModelStateResponseFactory = ActionContext=>{

                var tonyerror= ActionContext.ModelState;
                
                var errors =ActionContext.ModelState
                .Where(e =>e.Value.Errors.Count>0)
                .SelectMany(x =>x.Value.Errors)
                .Select(x =>x.ErrorMessage).ToArray();
                var errorResponse= new ApiValidationErrorResponse
                {
                  Errors =errors ,
                 
                };
                return new BadRequestObjectResult(errorResponse);
            }
            );
             services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

              services.AddSwaggerDocumentation();
              services.AddApplicationServices();
             services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
             app.UseMiddleware<ExceptionMiddleware>();
             app.UseSwaggerDocumentation();

            if (env.IsDevelopment())
            {
             
            }
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();

             app.UseCors("CorsPolicy");

             app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
