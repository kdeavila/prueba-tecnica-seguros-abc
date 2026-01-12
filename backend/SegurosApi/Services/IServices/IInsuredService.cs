using SegurosApi.Common;
using SegurosApi.DTOs;

namespace SegurosApi.Services.IServices;

public interface IInsuredService
{
  Task<PaginatedResponse<InsuredResponseDto>> GetAllAsync(int pageNumber, int pageSize);
  Task<InsuredResponseDto?> GetByIdAsync(long identificationNumber);
  Task<IEnumerable<InsuredResponseDto>> SearchByIdentificationAsync(string searchTerm);
  Task<ServiceResult<InsuredResponseDto>> CreateAsync(InsuredCreateDto dto);
  Task<ServiceResult<InsuredResponseDto>> UpdateAsync(long identificationNumber, InsuredUpdateDto dto);
  Task<ServiceResult<bool>> DeleteAsync(long identificationNumber);
}
