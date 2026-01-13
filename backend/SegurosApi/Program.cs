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

// Database - Parse Railway DATABASE_URL or use local connection string
string? connectionString;
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

if (!string.IsNullOrEmpty(databaseUrl))
{
  // Railway provides DATABASE_URL in URI format: postgresql://user:password@host:port/database
  // Npgsql requires: Host=host;Port=port;Database=database;Username=user;Password=password
  var uri = new Uri(databaseUrl);
  var userInfo = uri.UserInfo.Split(':');
  connectionString = $"Host={uri.Host};Port={uri.Port};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
}
else
{
  connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
  options.UseNpgsql(connectionString);
});

// Dependency Injection
builder.Services.AddScoped<IInsuredRepository, InsuredRepository>();
builder.Services.AddScoped<IInsuredService, InsuredService>();

// CORS configuration
var allowedOrigins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")?.Split(',') 
  ?? ["http://localhost:4200"];

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowedOrigins", policy =>
  {
    policy.WithOrigins(allowedOrigins)
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});

var app = builder.Build();

// Apply pending migrations automatically in production
if (!app.Environment.IsDevelopment())
{
  using var scope = app.Services.CreateScope();
  var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  context.Database.Migrate();
}

// Seed database in development
if (app.Environment.IsDevelopment())
{
  using var scope = app.Services.CreateScope();
  var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  DbSeeder.Seed(context);
}

// Configure the HTTP request pipeline
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();

// Don't force HTTPS in Railway (it handles SSL termination)
if (app.Environment.IsDevelopment())
{
  app.UseHttpsRedirection();
}

app.UseCors("AllowedOrigins");

app.UseAuthorization();

app.MapControllers();

// Railway requires the app to listen on PORT environment variable
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");
