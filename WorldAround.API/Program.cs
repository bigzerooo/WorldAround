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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(e =>
{
    e.MapControllers();
});

app.Run();
