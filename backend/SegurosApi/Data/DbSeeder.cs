using SegurosApi.Models;

namespace SegurosApi.Data;

public static class DbSeeder
{
  public static void Seed(AppDbContext context)
  {
    if (context.Insureds.Any())
      return;

    var insureds = new List<Insured>
    {
      new()
      {
        IdentificationNumber = 1043126169,
        FirstName = "Carlos",
        MiddleName = "Andrés",
        FirstLastName = "Martínez",
        SecondLastName = "López",
        PhoneNumber = "+57 300 123 4567",
        Email = "carlos.martinez@email.com",
        BirthDate = new DateOnly(1990, 5, 15),
        EstimatedInsuranceValue = 50000000,
        Notes = "Cliente interesado en seguro de vida"
      },
      new()
      {
        IdentificationNumber = 1087654321,
        FirstName = "María",
        MiddleName = "Fernanda",
        FirstLastName = "García",
        SecondLastName = "Rodríguez",
        PhoneNumber = "+57 301 234 5678",
        Email = "maria.garcia@email.com",
        BirthDate = new DateOnly(1985, 8, 22),
        EstimatedInsuranceValue = 75000000,
        Notes = "Interesada en seguro de hogar"
      },
      new()
      {
        IdentificationNumber = 1023456789,
        FirstName = "Juan",
        MiddleName = null,
        FirstLastName = "Pérez",
        SecondLastName = "Sánchez",
        PhoneNumber = "+57 302 345 6789",
        Email = "juan.perez@email.com",
        BirthDate = new DateOnly(1992, 3, 10),
        EstimatedInsuranceValue = 30000000,
        Notes = null
      },
      new()
      {
        IdentificationNumber = 1098765432,
        FirstName = "Ana",
        MiddleName = "María",
        FirstLastName = "Torres",
        SecondLastName = "Díaz",
        PhoneNumber = "+57 303 456 7890",
        Email = "ana.torres@email.com",
        BirthDate = new DateOnly(1988, 11, 5),
        EstimatedInsuranceValue = 100000000,
        Notes = "Cliente premium, requiere atención prioritaria"
      },
      new()
      {
        IdentificationNumber = 1012345678,
        FirstName = "Luis",
        MiddleName = "Eduardo",
        FirstLastName = "Ramírez",
        SecondLastName = "Moreno",
        PhoneNumber = "+57 304 567 8901",
        Email = "luis.ramirez@email.com",
        BirthDate = new DateOnly(1995, 7, 18),
        EstimatedInsuranceValue = 25000000,
        Notes = null
      },
      new()
      {
        IdentificationNumber = 1076543210,
        FirstName = "Laura",
        MiddleName = null,
        FirstLastName = "Hernández",
        SecondLastName = "Castro",
        PhoneNumber = "+57 305 678 9012",
        Email = "laura.hernandez@email.com",
        BirthDate = new DateOnly(1991, 1, 25),
        EstimatedInsuranceValue = 60000000,
        Notes = "Seguro vehicular y de vida"
      },
      new()
      {
        IdentificationNumber = 1034567890,
        FirstName = "Diego",
        MiddleName = "Alejandro",
        FirstLastName = "Vargas",
        SecondLastName = "Ruiz",
        PhoneNumber = "+57 306 789 0123",
        Email = "diego.vargas@email.com",
        BirthDate = new DateOnly(1987, 9, 30),
        EstimatedInsuranceValue = 45000000,
        Notes = null
      },
      new()
      {
        IdentificationNumber = 1065432109,
        FirstName = "Patricia",
        MiddleName = "Isabel",
        FirstLastName = "Mendoza",
        SecondLastName = "Gómez",
        PhoneNumber = "+57 307 890 1234",
        Email = "patricia.mendoza@email.com",
        BirthDate = new DateOnly(1993, 4, 12),
        EstimatedInsuranceValue = 80000000,
        Notes = "Referida por cliente existente"
      },
      new()
      {
        IdentificationNumber = 1056789012,
        FirstName = "Roberto",
        MiddleName = null,
        FirstLastName = "Silva",
        SecondLastName = "Ortiz",
        PhoneNumber = "+57 308 901 2345",
        Email = "roberto.silva@email.com",
        BirthDate = new DateOnly(1989, 12, 8),
        EstimatedInsuranceValue = 35000000,
        Notes = "Consulta sobre coberturas adicionales"
      },
      new()
      {
        IdentificationNumber = 1045678901,
        FirstName = "Camila",
        MiddleName = "Andrea",
        FirstLastName = "Rojas",
        SecondLastName = "Medina",
        PhoneNumber = "+57 309 012 3456",
        Email = "camila.rojas@email.com",
        BirthDate = new DateOnly(1994, 6, 20),
        EstimatedInsuranceValue = 55000000,
        Notes = null
      },
      new()
      {
        IdentificationNumber = 1078901234,
        FirstName = "Andrés",
        MiddleName = "Felipe",
        FirstLastName = "Castro",
        SecondLastName = "Reyes",
        PhoneNumber = "+57 310 123 4567",
        Email = "andres.castro@email.com",
        BirthDate = new DateOnly(1986, 2, 14),
        EstimatedInsuranceValue = 90000000,
        Notes = "Empresario, interesado en póliza empresarial"
      },
      new()
      {
        IdentificationNumber = 1089012345,
        FirstName = "Valentina",
        MiddleName = null,
        FirstLastName = "Morales",
        SecondLastName = "Jiménez",
        PhoneNumber = "+57 311 234 5678",
        Email = "valentina.morales@email.com",
        BirthDate = new DateOnly(1997, 10, 3),
        EstimatedInsuranceValue = 20000000,
        Notes = null
      }
    };

    context.Insureds.AddRange(insureds);
    context.SaveChanges();
  }
}
