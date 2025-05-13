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
dotnet build backend/SearchServiceEngine/SearchServiceEngine.csproj
dotnet run --project backend/SearchServiceEngine/SearchServiceEngine.csproj
```

### Autenticación y Autorización

El backend utiliza Microsoft Identity Framework para la gestión de usuarios, combinado con JWT para autenticación:

- El endpoint `/api/auth/login` permite autenticación y devuelve un JWT válido para credenciales correctas. **Este endpoint recibe un objeto JSON con los campos `username` y `password` (DTO `LoginRequest`), no el modelo completo de usuario.**
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

# SearchServiceEngine Backend

Este proyecto implementa un backend robusto para la gestión de contactos y usuarios, siguiendo buenas prácticas de arquitectura (capas, DTOs, servicios, repositorios) y seguridad (JWT, roles, validación).

## Características principales
- Autenticación JWT y protección de endpoints con roles.
- CRUD de contactos con filtros y paginación.
- Validación de entrada con FluentValidation.
- Mapeo de entidades y DTOs con AutoMapper.
- Semilla de datos de ejemplo y migraciones automáticas.
- Documentación automática de la API (Swagger/OpenAPI).
- Gestión segura y eliminación de refresh tokens tras login.
- Registro de usuarios solo por administradores.
- Estructura modular y escalable.

## Últimos avances (13/05/2025)
- Implementado endpoint de registro de usuarios (solo Admin) con validación avanzada.
- Documentados endpoints, DTOs y validadores de usuario.
- Corregidos los principales warnings de compilación.

## Estado del backend (actualizado 13/05/2025)

- Controladores y servicios principales refactorizados y robustos (Contacts, Users, Auth).
- Tests unitarios completos y pasando para controladores y servicios principales.
- Eliminadas advertencias de nulabilidad en los tests.
- TODO.md actualizado con el progreso real.

### Próximos pasos sugeridos
- Añadir pruebas de integración.
- Configurar CI/CD, logs y CORS.
- Mantener documentación y ejemplos de uso actualizados.

## Estructura del proyecto
- `Controllers/`: Endpoints de la API (Contactos, Usuarios, Auth).
- `DTOs/`: Modelos de transferencia de datos y validadores.
- `Models/`: Entidades de base de datos.
- `Services/`: Lógica de negocio.
- `Repositories/`: Acceso a datos.
- `Data/`: Contexto de base de datos y migraciones.

## Próximos pasos
- Completar CRUD de usuarios y sus DTOs.
- Añadir ejemplos de uso y más pruebas unitarias.
- Mejorar la documentación y despliegue.

## Cómo contribuir
Consulta el archivo `TODO.md` para ver el estado y prioridades del desarrollo.

## Frontend

El frontend está desarrollado en React utilizando Vite como herramienta de construcción y desarrollo rápido. La estructura inicial incluye:

- **React 19** y **Vite** para desarrollo moderno y rápido.
- **React Router** para gestión de rutas y navegación SPA.
- Estructura de carpetas bajo `src/` con páginas (`pages/`), rutas centralizadas (`routes.tsx`) y assets.
- Páginas base implementadas: Home, Login, Dashboard y NotFound (404).
- Preparado para consumir la API del backend y gestionar autenticación JWT.
- Listo para añadir componentes reutilizables, estilos y lógica de negocio.

Para iniciar el frontend en modo desarrollo:

```powershell
cd frontend
npm install
npm run dev
```

El frontend se irá ampliando con autenticación, consumo de API, diseño responsivo y pruebas conforme avance el proyecto.

---

Consulta el archivo `.github/.instructions.md` para conocer las reglas de trabajo y colaboración.

---

Este archivo se irá actualizando conforme avance el proyecto y se definan nuevos objetivos o funcionalidades.
