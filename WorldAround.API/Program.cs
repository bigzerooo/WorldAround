using WorldAround.API;
using WorldAround.Application;
using WorldAround.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;
var configuration = builder.Configuration;

services.AddInfrastructure(configuration);
services.AddApplication();
services.AddApi(configuration);

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

    options.AddPolicy("prodOrigins",
        policy =>
        {
            policy
                .WithOrigins("https://worldaround.azurewebsites.net")
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
app.UseCors("prodOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
