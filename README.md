# Proyecto AIWeek

Este repositorio contiene el desarrollo y documentación del proyecto AIWeek.

## Descripción

Este proyecto explora y documenta el desarrollo colaborativo asistido por IA, implementando un backend robusto en .NET Core y un frontend moderno en React.

## Estructura general

- `.github/`: Instrucciones y configuraciones para la colaboración.
- `README.md`: Documentación general del proyecto.
- `backend/`: Web API en .NET Core (ver detalles abajo).
- `frontend/`: Proyecto en React + Vite.

---

# Backend: SearchServiceEngine

El backend implementa una API REST robusta para la gestión de contactos y usuarios, siguiendo buenas prácticas de arquitectura (capas, DTOs, servicios, repositorios) y seguridad (JWT, roles, validación).

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
- El login devuelve tanto `token` como `refreshToken` (ya no `accessToken`).

## Estado actual (13/05/2025)
- Controladores y servicios principales refactorizados y robustos (Contacts, Users, Auth).
- Tests unitarios completos y pasando para controladores y servicios principales.
- Eliminadas advertencias de nulabilidad en los tests.
- `TODO.md` actualizado con el progreso real.

### Próximos pasos sugeridos
- (Opcional) Añadir pruebas de integración.
- Mantener documentación y ejemplos de uso actualizados.

## Estructura del backend
- `Controllers/`: Endpoints de la API (Contactos, Usuarios, Auth).
- `DTOs/`: Modelos de transferencia de datos y validadores.
- `Models/`: Entidades de base de datos.
- `Services/`: Lógica de negocio.
- `Repositories/`: Acceso a datos.
- `Data/`: Contexto de base de datos y migraciones.

## Ejecución local

```powershell
# Compilar y ejecutar el backend
cd backend
 dotnet build SearchServiceEngine/SearchServiceEngine.csproj
 dotnet run --project SearchServiceEngine/SearchServiceEngine.csproj
```

## Pruebas unitarias

El proyecto `SearchServiceEngine.Tests` utiliza xUnit y Moq. Las pruebas usan EF Core InMemory para simular la base de datos.

```powershell
dotnet test backend/SearchServiceEngine.Tests/SearchServiceEngine.Tests.csproj
```

Consulta el archivo `TODO.md` para ver el estado y prioridades del desarrollo.

---

# Frontend

El frontend está desarrollado en React 19 + Vite. Estructura inicial:

- **React 19** y **Vite** para desarrollo moderno y rápido.
- **React Router** para navegación SPA.
- Carpeta `src/` con páginas (`pages/`), rutas (`routes.tsx`) y assets.
- Páginas base: Home, Login, Dashboard, NotFound.
- Preparado para consumir la API y gestionar autenticación JWT.

## Ejecución local

```powershell
cd frontend
npm install
npm run dev
```

---

Consulta el archivo `.github/.instructions.md` para conocer las reglas de trabajo y colaboración.

Este archivo se irá actualizando conforme avance el proyecto y se definan nuevos objetivos o funcionalidades.
