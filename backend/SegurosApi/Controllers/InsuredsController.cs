using Microsoft.AspNetCore.Mvc;
using SegurosApi.Common;
using SegurosApi.DTOs;
using SegurosApi.Services.IServices;

namespace SegurosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class InsuredsController(IInsuredService service) : ControllerBase
{
  private readonly IInsuredService _service = service;

  [HttpGet]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  public async Task<ActionResult<PaginatedResponse<InsuredResponseDto>>> GetAll(
      [FromQuery] int pageNumber = 1,
      [FromQuery] int pageSize = 10)
  {
    if (pageNumber < 1 || pageSize < 1)
      return BadRequest(new { message = "El número de página y tamaño deben ser mayores a 0" });

    if (pageSize > 100)
      return BadRequest(new { message = "El tamaño máximo de página es 100" });

    var result = await _service.GetAllAsync(pageNumber, pageSize);
    return Ok(result);
  }

  [HttpGet("{id}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<ActionResult<InsuredResponseDto>> GetById(long id)
  {
    var insured = await _service.GetByIdAsync(id);

    if (insured == null)
      return NotFound(new { message = "No se encontró el asegurado" });

    return Ok(insured);
  }

  [HttpGet("search/{searchTerm}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<ActionResult<IEnumerable<InsuredResponseDto>>> SearchByIdentification(string searchTerm)
  {
    var insureds = await _service.SearchByIdentificationAsync(searchTerm);
    return Ok(insureds);
  }

  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status409Conflict)]
  public async Task<ActionResult<InsuredResponseDto>> Create([FromBody] InsuredCreateDto dto)
  {
    if (!ModelState.IsValid)
      return BadRequest(ModelState);

    var result = await _service.CreateAsync(dto);

    if (!result.Success)
    {
      return result.ErrorType switch
      {
        ServiceErrorType.Conflict => Conflict(new { message = result.ErrorMessage }),
        _ => BadRequest(new { message = result.ErrorMessage })
      };
    }

    return CreatedAtAction(
        nameof(GetById),
        new { id = result.Data!.IdentificationNumber },
        result.Data);
  }

  [HttpPut("{id}")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  [ProducesResponseType(StatusCodes.Status409Conflict)]
  public async Task<IActionResult> Update(long id, [FromBody] InsuredUpdateDto dto)
  {
    if (!ModelState.IsValid)
      return BadRequest(ModelState);

    var result = await _service.UpdateAsync(id, dto);

    if (!result.Success)
    {
      return result.ErrorType switch
      {
        ServiceErrorType.NotFound => NotFound(new { message = result.ErrorMessage }),
        ServiceErrorType.Conflict => Conflict(new { message = result.ErrorMessage }),
        _ => BadRequest(new { message = result.ErrorMessage })
      };
    }

    return NoContent();
  }

  [HttpDelete("{id}")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public async Task<IActionResult> Delete(long id)
  {
    var result = await _service.DeleteAsync(id);

    if (!result.Success)
      return NotFound(new { message = result.ErrorMessage });

    return NoContent();
  }
}
