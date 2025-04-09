using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;
using FitnessTracker.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Connecting to database
var connectionString = builder.Configuration.GetConnectionString("FitnessTrackerDbConnection")
    ?? throw new InvalidOperationException("Connection string is missing");
builder.Services.AddDbContext<DataContext>(options => options.UseMySQL(connectionString));

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("v1", new OpenApiInfo {
        Version = "V1",
        Title = "Fitness Tracker API",
        Description = "API for tracking fitness activities",
    });
    
});

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
