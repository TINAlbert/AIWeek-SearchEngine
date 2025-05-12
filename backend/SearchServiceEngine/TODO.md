# Lista de tareas para el backend

Este archivo contiene una lista inicial de tareas y funcionalidades pendientes para el desarrollo del backend.

## Tareas pendientes

- [x] Definir los endpoints principales de la API (login, usuarios)
- [x] Implementar autenticación (JWT Bearer) y autorización basada en roles o políticas
- [x] Diseñar y crear los modelos de datos principales (User)
- [x] Organizar los endpoints en controladores y eliminar código innecesario (WeatherForecast)
- [x] Configurar el acceso a base de datos (por ejemplo, Entity Framework Core con SQL Server o SQLite)
- [x] Crear y aplicar migraciones de base de datos
- [x] Automatizar la captura y uso del token JWT en backend.http usando scripting de REST Client
- [x] Renombrar y reorganizar el proyecto backend a SearchServiceEngine
- [x] Actualizar namespaces y dependencias tras el renombrado
- [x] Mejorar la gestión de contraseñas (hashing) - integrado con Identity.
- [ ] Añadir endpoints CRUD completos para usuarios.
- [x] Crear proyecto de pruebas unitarias con xUnit y Moq para el backend.
- [x] Añadir pruebas unitarias para AuthController (login correcto y fallido).
- [ ] Añadir más pruebas unitarias para otros controladores y lógica de negocio.
- [ ] Documentar la API con OpenAPI/Swagger.
- [ ] Configurar despliegue y CI/CD.
- [ ] Continuar con la implementación y estructura del frontend en React.
- [ ] Mantener actualizado Chat.md y la documentación según se avance.

## Migración a Microsoft Identity con JWT

- [x] Instalar paquetes:
   - Microsoft.AspNetCore.Identity.EntityFrameworkCore
   - Microsoft.AspNetCore.Authentication.JwtBearer
- [x] Modificar el modelo `User` para heredar de `IdentityUser`.
- [x] Cambiar `AppDbContext` para heredar de `IdentityDbContext<User>`.
- [x] Configurar Identity y JWT en `Program.cs`:
   - Agregar servicios de Identity y JWT.
   - Configurar validación de tokens.
- [x] Modificar el flujo de login para usar `UserManager` y `SignInManager`.
- [x] Usar `[Authorize]` y roles de Identity en los controladores.
- [x] Migrar la base de datos para incluir tablas de Identity (`AspNetUsers`, `AspNetRoles`, etc.).
- [x] Actualizar pruebas unitarias para funcionar con Identity.
- [ ] Actualizar documentación del README sobre Identity.

> Ver README y documentación oficial para detalles de configuración.

Este archivo se irá actualizando conforme se definan y completen nuevas tareas.
