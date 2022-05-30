using WorldAround.API;
using WorldAround.Application;
using WorldAround.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;
var configuration = builder.Configuration;

services.AddApi(configuration);
services.AddApplication();
services.AddInfrastructure(configuration);

services.AddCors(options =>
{
    options.AddPolicy("localhostUIOrigins",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:4200")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("localhostUIOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
