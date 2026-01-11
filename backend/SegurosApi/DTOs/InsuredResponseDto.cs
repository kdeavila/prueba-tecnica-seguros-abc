namespace SegurosApi.DTOs;

public class InsuredResponseDto
{
  public long IdentificationNumber { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string? MiddleName { get; set; }
  public string FirstLastName { get; set; } = string.Empty;
  public string SecondLastName { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public DateOnly BirthDate { get; set; }
  public decimal EstimatedInsuranceValue { get; set; }
  public string? Notes { get; set; }
}
