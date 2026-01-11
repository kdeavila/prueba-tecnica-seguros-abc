using Microsoft.EntityFrameworkCore;
using SegurosApi.Models;

namespace SegurosApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public DbSet<Insured> Insureds { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Insured>(entity =>
    {
      entity.ToTable("Insureds");
      entity.HasKey(e => e.IdentificationNumber);
      entity.HasIndex(e => e.Email).IsUnique();
    });
  }
}
