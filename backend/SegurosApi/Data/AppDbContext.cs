using Microsoft.EntityFrameworkCore;
using SegurosApi.Models;

namespace SegurosApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<Asegurado> Asegurados { get; set; }
}
