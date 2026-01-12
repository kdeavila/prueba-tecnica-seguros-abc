namespace SegurosApi.Common;

public class ServiceResult<T>
{
  public bool Success { get; set; }
  public T? Data { get; set; }
  public string? ErrorMessage { get; set; }
  public ServiceErrorType? ErrorType { get; set; }

  public static ServiceResult<T> Ok(T data) => new() { Success = true, Data = data };

  public static ServiceResult<T> Error(string message, ServiceErrorType errorType) =>
      new() { Success = false, ErrorMessage = message, ErrorType = errorType };
}
