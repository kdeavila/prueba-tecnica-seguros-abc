# Seguros ABC - Sistema de Gestión de Asegurados

Sistema para gestionar información de potenciales asegurados para SEGUROS ABC.

## Tecnologías

- **Backend**: .NET 10 con Entity Framework Core
- **Frontend**: Angular 21
- **Base de datos**: PostgreSQL

## Backend

### Requisitos

- .NET 10 SDK
- PostgreSQL

### Configuración

1. Clonar el repositorio
2. Configurar la cadena de conexión en `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=seguros_db;Username=tu_usuario;Password=tu_contraseña"
  }
}
```

3. Ejecutar las migraciones:

```bash
cd backend/SegurosApi
dotnet ef database update
```

4. Iniciar la API:

```bash
dotnet run
```

La API estará disponible en `https://localhost:7126`

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/insureds | Listar con paginación |
| GET | /api/insureds/{id} | Obtener por ID |
| GET | /api/insureds/search/{identificationNumber} | Buscar por identificación |
| POST | /api/insureds | Crear asegurado |
| PUT | /api/insureds/{id} | Actualizar asegurado |
| DELETE | /api/insureds/{id} | Eliminar asegurado |

## Frontend

*Pendiente de implementación*