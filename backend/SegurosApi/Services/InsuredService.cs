using Mapster;
using SegurosApi.Common;
using SegurosApi.DTOs;
using SegurosApi.Models;
using SegurosApi.Repositories;
using SegurosApi.Services.IServices;

namespace SegurosApi.Services;

public class InsuredService(IInsuredRepository repository) : IInsuredService
{
  private readonly IInsuredRepository _repository = repository;

  public async Task<PaginatedResponse<InsuredResponseDto>> GetAllAsync(int pageNumber, int pageSize)
  {
    var (items, totalCount) = await _repository.GetAllAsync(pageNumber, pageSize);

    return new PaginatedResponse<InsuredResponseDto>
    {
      Items = items.Adapt<IEnumerable<InsuredResponseDto>>(),
      PageNumber = pageNumber,
      PageSize = pageSize,
      TotalCount = totalCount
    };
  }

  public async Task<InsuredResponseDto?> GetByIdAsync(long identificationNumber)
  {
    var insured = await _repository.GetByIdAsync(identificationNumber);
    return insured?.Adapt<InsuredResponseDto>();
  }

  public async Task<IEnumerable<InsuredResponseDto>> SearchByIdentificationAsync(string searchTerm)
  {
    var insureds = await _repository.SearchByIdentificationAsync(searchTerm);
    return insureds.Adapt<IEnumerable<InsuredResponseDto>>();
  }

  public async Task<ServiceResult<InsuredResponseDto>> CreateAsync(InsuredCreateDto dto)
  {
    if (dto.BirthDate > DateOnly.FromDateTime(DateTime.Today))
      return ServiceResult<InsuredResponseDto>.Error(
                "La fecha de nacimiento no puede ser en el futuro",
                ServiceErrorType.ValidationError);

    if (await _repository.ExistsByIdAsync(dto.IdentificationNumber))
      return ServiceResult<InsuredResponseDto>.Error(
          "Ya existe un asegurado con ese número de identificación",
          ServiceErrorType.Conflict);

    if (await _repository.ExistsByEmailAsync(dto.Email))
      return ServiceResult<InsuredResponseDto>.Error(
          "Ya existe un asegurado con ese correo electrónico",
          ServiceErrorType.Conflict);

    var insured = dto.Adapt<Insured>();
    var created = await _repository.CreateAsync(insured);

    return ServiceResult<InsuredResponseDto>.Ok(created.Adapt<InsuredResponseDto>());
  }

  public async Task<ServiceResult<InsuredResponseDto>> UpdateAsync(long identificationNumber, InsuredUpdateDto dto)
  {
    if (dto.BirthDate > DateOnly.FromDateTime(DateTime.Today))
      return ServiceResult<InsuredResponseDto>.Error(
          "La fecha de nacimiento no puede ser en el futuro",
          ServiceErrorType.ValidationError);

    var existing = await _repository.GetByIdAsync(identificationNumber);

    if (existing == null)
      return ServiceResult<InsuredResponseDto>.Error(
          "No se encontró el asegurado",
          ServiceErrorType.NotFound);

    if (await _repository.ExistsByEmailAsync(dto.Email, identificationNumber))
      return ServiceResult<InsuredResponseDto>.Error(
          "Ya existe otro asegurado con ese correo electrónico",
          ServiceErrorType.Conflict);

    dto.Adapt(existing);
    var result = await _repository.UpdateAsync(existing);

    return ServiceResult<InsuredResponseDto>.Ok(result.Adapt<InsuredResponseDto>());
  }

  public async Task<ServiceResult<bool>> DeleteAsync(long identificationNumber)
  {
    if (!await _repository.ExistsByIdAsync(identificationNumber))
      return ServiceResult<bool>.Error(
            "No se encontró el asegurado",
            ServiceErrorType.NotFound);

    await _repository.DeleteAsync(identificationNumber);
    return ServiceResult<bool>.Ok(true);
  }
}
