using Swashbuckle.AspNetCore.Filters;
using Microsoft.OpenApi.Models;
using FitnessTracker.Data;
using Microsoft.EntityFrameworkCore;
// jwt Authentication
using FitnessTracker.JwtConfiguration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
    // Addig Jwt functionality to swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
        In = ParameterLocation.Header,
        Description = "Please insert a valid Jwt token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
    
});

// JWT Authentication
#region Jwt Authentication
var JwtSettings = new JwtSettings();
builder.Configuration.GetSection(nameof(JwtSettings)).Bind(JwtSettings);
builder.Services.AddSingleton(JwtSettings);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = JwtSettings.Issuer,
        ValidAudience = JwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8
            .GetBytes(JwtSettings.SecretKey))
    };
});
builder.Services.AddAuthorization();

#endregion

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
