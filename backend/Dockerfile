# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY SegurosApi/SegurosApi.csproj SegurosApi/
RUN dotnet restore SegurosApi/SegurosApi.csproj

# Copy everything else and build
COPY . .
WORKDIR /src/SegurosApi
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Copy published app
COPY --from=build /app/publish .

# Railway sets PORT environment variable
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "SegurosApi.dll"]
