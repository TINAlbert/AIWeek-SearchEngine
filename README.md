# Proyecto AIWeek

Este repositorio contiene el desarrollo y documentación del proyecto AIWeek.

## Descripción

Este proyecto está orientado a probar y documentar las capacidades de la IA en el desarrollo colaborativo de software.

## Estructura

- `.github/`: Instrucciones y configuraciones para la colaboración.
- `README.md`: Documentación general del proyecto.
- `backend/`: Proyecto de backend desarrollado en .NET Core (Web API). Incluye:
  - Modelos organizados en `backend/Models/`
  - Endpoints organizados en controladores (`Controllers`)
  - Autenticación JWT y roles
  - Endpoints implementados: `/api/auth/login`, `/api/users`
- `frontend/`: Proyecto de frontend (próximamente en React).

## Backend

El backend está implementado como un servicio Web API en .NET Core. Para ejecutarlo localmente:

```powershell
dotnet run --project backend
```

El endpoint `/api/auth/login` permite autenticación y devuelve un JWT válido para los usuarios definidos en memoria.
El endpoint `/api/users` permite consultar los usuarios (requiere rol Admin).

## Pruebas unitarias

Se ha creado el proyecto `SearchServiceEngine.Tests` con xUnit y Moq para pruebas unitarias del backend. Las pruebas utilizan Entity Framework Core InMemory para simular la base de datos.

### Ejecución de tests

Desde la raíz del proyecto:

```powershell
dotnet test backend/SearchServiceEngine.Tests/SearchServiceEngine.Tests.csproj
```

### Tests implementados
- **Login_ReturnsUnauthorized_WhenUserNotFound**: Verifica que el login falla si el usuario no existe.
- **Login_ReturnsToken_WhenUserExistsAndPasswordMatches**: Verifica que el login exitoso devuelve un token JWT válido.

Puedes agregar más pruebas siguiendo el mismo patrón en el archivo `AuthControllerTests.cs`.

---

Consulta el archivo `.github/.instructions.md` para conocer las reglas de trabajo y colaboración.

---

Este archivo se irá actualizando conforme avance el proyecto y se definan nuevos objetivos o funcionalidades.
