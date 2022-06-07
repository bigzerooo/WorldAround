using WorldAround.Events.Infrastructure;
using WorldAround.Events.Application;
using WorldAround.Events.API;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddInfrastructure(builder.Configuration);
services.AddApplication(builder.Configuration);
services.AddApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
