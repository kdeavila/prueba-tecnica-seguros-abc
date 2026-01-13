# Seguros ABC

Sistema de gestión de asegurados desarrollado como prueba técnica para **Atlantic QI**.

## Requisitos

Asegúrate de tener instalados:

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Configuración de la Base de Datos

1. Crea una base de datos llamada `SegurosABC` en PostgreSQL

2. Si tu configuración de PostgreSQL es diferente, edita el archivo `backend/SegurosApi/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=SegurosABC;Username=postgres;Password=postgres"
  }
}
```

## Ejecutar el Backend

```bash
cd backend/SegurosApi
dotnet ef database update
dotnet run
```

La API se ejecutará en `http://localhost:5000`

Puedes ver la documentación de la API en: `http://localhost:5000/swagger`

## Ejecutar el Frontend

```bash
cd frontend/SegurosApp
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Uso

1. Inicia primero el backend
2. Luego inicia el frontend
3. Accede a `http://localhost:4200` en tu navegador

---

Desarrollado por **Keyner de Ávila**