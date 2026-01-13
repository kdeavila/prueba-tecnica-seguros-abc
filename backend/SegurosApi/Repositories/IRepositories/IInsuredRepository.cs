using SegurosApi.Models;

namespace SegurosApi.Repositories;

public interface IInsuredRepository
{
  Task<(IEnumerable<Insured> Items, int TotalCount)> GetAllAsync(int pageNumber, int pageSize);
  Task<Insured?> GetByIdAsync(long identificationNumber);
  Task<IEnumerable<Insured>> SearchByIdentificationAsync(string searchTerm);
  Task<bool> ExistsByIdAsync(long identificationNumber);
  Task<bool> ExistsByEmailAsync(string email, long? excludeId = null);
  Task<Insured> CreateAsync(Insured insured);
  Task<Insured> UpdateAsync(Insured insured);
  Task<bool> DeleteAsync(long identificationNumber);
}
