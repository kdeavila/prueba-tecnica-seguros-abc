using Microsoft.EntityFrameworkCore;
using SegurosApi.Data;
using SegurosApi.Models;

namespace SegurosApi.Repositories;

public class InsuredRepository : IInsuredRepository
{
  private readonly AppDbContext _context;

  public InsuredRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<(IEnumerable<Insured> Items, int TotalCount)> GetAllAsync(int pageNumber, int pageSize)
  {
    var totalCount = await _context.Insureds.CountAsync();

    var items = await _context.Insureds
        .OrderBy(i => i.FirstLastName)
        .ThenBy(i => i.FirstName)
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .AsNoTracking()
        .ToListAsync();

    return (items, totalCount);
  }

  public async Task<Insured?> GetByIdAsync(long identificationNumber)
  {
    return await _context.Insureds
        .AsNoTracking()
        .FirstOrDefaultAsync(i => i.IdentificationNumber == identificationNumber);
  }

  public async Task<IEnumerable<Insured>> SearchByIdentificationAsync(long identificationNumber)
  {
    return await _context.Insureds
        .Where(i => i.IdentificationNumber == identificationNumber)
        .AsNoTracking()
        .ToListAsync();
  }

  public async Task<bool> ExistsByIdAsync(long identificationNumber)
  {
    return await _context.Insureds
        .AnyAsync(i => i.IdentificationNumber == identificationNumber);
  }

  public async Task<bool> ExistsByEmailAsync(string email, long? excludeId = null)
  {
    var query = _context.Insureds.Where(i => i.Email == email);

    if (excludeId.HasValue)
    {
      query = query.Where(i => i.IdentificationNumber != excludeId.Value);
    }

    return await query.AnyAsync();
  }

  public async Task<Insured> CreateAsync(Insured insured)
  {
    _context.Insureds.Add(insured);
    await _context.SaveChangesAsync();
    return insured;
  }

  public async Task<Insured> UpdateAsync(Insured insured)
  {
    _context.Insureds.Update(insured);
    await _context.SaveChangesAsync();
    return insured;
  }

  public async Task<bool> DeleteAsync(long identificationNumber)
  {
    var insured = await _context.Insureds.FindAsync(identificationNumber);

    if (insured == null)
      return false;

    _context.Insureds.Remove(insured);
    await _context.SaveChangesAsync();
    return true;
  }
}
