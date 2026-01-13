using Microsoft.EntityFrameworkCore;
using SegurosApi.Data;
using SegurosApi.Repositories;
using SegurosApi.Services;
using SegurosApi.Services.IServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// Database
var connectionString = builder.Environment.IsProduction()
  ? Environment.GetEnvironmentVariable("DATABASE_URL")
  : builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
{
  options.UseNpgsql(connectionString);
});

// Dependency Injection
builder.Services.AddScoped<IInsuredRepository, InsuredRepository>();
builder.Services.AddScoped<IInsuredService, InsuredService>();

// CORS for Angular
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngular", policy =>
  {
    policy.WithOrigins("http://localhost:4200")
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});

var app = builder.Build();

// Seed database in development
if (app.Environment.IsDevelopment())
{
  using var scope = app.Services.CreateScope();
  var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  DbSeeder.Seed(context);
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();
