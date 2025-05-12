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

### Autenticación y Autorización

El backend utiliza Microsoft Identity Framework para la gestión de usuarios, combinado con JWT para autenticación:

- El endpoint `/api/auth/login` permite autenticación y devuelve un JWT válido para credenciales correctas
- El endpoint `/api/users` permite consultar los usuarios (requiere rol Admin)
- La protección de endpoints se realiza mediante atributos `[Authorize]` y roles

La autenticación combina las ventajas de Identity Framework (gestión de usuarios, roles, seguridad de contraseñas) con la flexibilidad de JWT para autenticación stateless.

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

## Migración a Identity Framework

El proyecto ha sido migrado a Microsoft Identity Framework para mejorar la seguridad y gestión de usuarios:

### Componentes implementados
- Modelo `User` heredando de `IdentityUser`
- `AppDbContext` heredando de `IdentityDbContext<User>`
- Configuración de Identity y JWT en `Program.cs`
- Uso de `UserManager<User>` y `SignInManager<User>` para gestión de usuarios
- Protección de endpoints con atributos `[Authorize]` y roles
- Migración de base de datos con tablas de Identity

### Ventajas de la migración
- Gestión segura de contraseñas (hashing y salting automáticos)
- Sistema de roles incorporado
- Validación y confirmación de email
- Recuperación de contraseñas
- Autenticación de dos factores
- Compatible con proveedores externos (Google, Facebook, etc.)
- Mantiene la flexibilidad de JWT para autenticación stateless

Los tests unitarios han sido adaptados para trabajar con Identity Framework utilizando `UserManager` y `SignInManager` mockeados.

---

Consulta el archivo `.github/.instructions.md` para conocer las reglas de trabajo y colaboración.

---

Este archivo se irá actualizando conforme avance el proyecto y se definan nuevos objetivos o funcionalidades.
