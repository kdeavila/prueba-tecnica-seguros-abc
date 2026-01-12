using System.ComponentModel.DataAnnotations;

namespace SegurosApi.DTOs;

public class InsuredUpdateDto
{
  [Required(ErrorMessage = "El primer nombre es requerido")]
  [StringLength(50, ErrorMessage = "El primer nombre no puede exceder 50 caracteres")]
  public string FirstName { get; set; } = string.Empty;

  [StringLength(50, ErrorMessage = "El segundo nombre no puede exceder 50 caracteres")]
  public string? MiddleName { get; set; }

  [Required(ErrorMessage = "El primer apellido es requerido")]
  [StringLength(50, ErrorMessage = "El primer apellido no puede exceder 50 caracteres")]
  public string FirstLastName { get; set; } = string.Empty;

  [Required(ErrorMessage = "El segundo apellido es requerido")]
  [StringLength(50, ErrorMessage = "El segundo apellido no puede exceder 50 caracteres")]
  public string SecondLastName { get; set; } = string.Empty;

  [Required(ErrorMessage = "El teléfono es requerido")]
  [Phone(ErrorMessage = "El formato del teléfono no es válido")]
  [StringLength(20, ErrorMessage = "El teléfono no puede exceder 20 caracteres")]
  public string PhoneNumber { get; set; } = string.Empty;

  [Required(ErrorMessage = "El email es requerido")]
  [EmailAddress(ErrorMessage = "El formato del email no es válido")]
  [StringLength(100, ErrorMessage = "El email no puede exceder 100 caracteres")]
  public string Email { get; set; } = string.Empty;

  [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
  public DateOnly BirthDate { get; set; }

  [Required(ErrorMessage = "El valor estimado del seguro es requerido")]
  [Range(0.01, double.MaxValue, ErrorMessage = "El valor del seguro debe ser mayor a 0")]
  public decimal EstimatedInsuranceValue { get; set; }

  [StringLength(500, ErrorMessage = "Las observaciones no pueden exceder 500 caracteres")]
  public string? Notes { get; set; }
}
