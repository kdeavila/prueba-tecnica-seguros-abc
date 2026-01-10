using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegurosApi.Models;

public class Asegurado
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.None)]
  [Required(ErrorMessage = "El número de identificación es requerido")]
  [Range(1, long.MaxValue, ErrorMessage = "El número de identificación debe ser un valor positivo")]
  public long NumeroIdentificacion { get; set; }

  [Required(ErrorMessage = "El primer nombre es requerido")]
  [StringLength(50, ErrorMessage = "El primer nombre no puede exceder 50 caracteres")]
  public string PrimerNombre { get; set; } = string.Empty;

  [StringLength(50, ErrorMessage = "El segundo nombre no puede exceder 50 caracteres")]
  public string? SegundoNombre { get; set; }

  [Required(ErrorMessage = "El primer apellido es requerido")]
  [StringLength(50, ErrorMessage = "El primer apellido no puede exceder 50 caracteres")]
  public string PrimerApellido { get; set; } = string.Empty;

  [Required(ErrorMessage = "El segundo apellido es requerido")]
  [StringLength(50, ErrorMessage = "El segundo apellido no puede exceder 50 caracteres")]
  public string SegundoApellido { get; set; } = string.Empty;

  [Required(ErrorMessage = "El teléfono es requerido")]
  [Phone(ErrorMessage = "El formato del teléfono no es válido")]
  [StringLength(20, ErrorMessage = "El teléfono no puede exceder 20 caracteres")]
  public string TelefonoContacto { get; set; } = string.Empty;

  [Required(ErrorMessage = "El email es requerido")]
  [EmailAddress(ErrorMessage = "El formato del email no es válido")]
  [StringLength(100, ErrorMessage = "El email no puede exceder 100 caracteres")]
  public string Email { get; set; } = string.Empty;

  [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
  [DataType(DataType.Date)]
  public DateTime FechaNacimiento { get; set; }

  [Required(ErrorMessage = "El valor estimado del seguro es requerido")]
  [Column(TypeName = "decimal(18,2)")]
  [Range(0.01, double.MaxValue, ErrorMessage = "El valor del seguro debe ser mayor a 0")]
  public decimal ValorEstimadoSeguro { get; set; }

  [StringLength(500, ErrorMessage = "Las observaciones no pueden exceder 500 caracteres")]
  public string? Observaciones { get; set; }
}
