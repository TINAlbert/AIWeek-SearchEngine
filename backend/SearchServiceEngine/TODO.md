# Lista de tareas para el backend

Este archivo contiene una lista detallada y actualizada de tareas y funcionalidades pendientes para el desarrollo del backend.

## Tareas pendientes

### 1. Autenticación y Autorización
- [x] Implementar login con JWT (Access Token)
- [ ] Implementar Refresh Token:
  - [ ] Crear entidad/modelo RefreshToken
  - [ ] Guardar refresh tokens en base de datos
  - [ ] Endpoint POST /auth/refresh para renovar tokens
  - [ ] Endpoint POST /auth/logout para revocar refresh token
  - [ ] Manejar expiración y revocación de refresh tokens
- [ ] (Opcional) Implementar registro de usuarios
- [ ] Añadir claims personalizados si es necesario

### 2. Gestión de Contactos
- [x] Crear entidad/modelo Contact
- [x] Crear DTOs para Contact (entrada/salida)
- [x] Implementar capa de servicios para lógica de negocio de contactos
- [x] Implementar capa de repositorios para acceso a datos de contactos
- [x] Endpoints CRUD:
  - [x] GET /contacts (con filtros y paginación)
  - [x] GET /contacts/{id}
  - [x] POST /contacts
  - [x] PUT /contacts/{id}
  - [x] DELETE /contacts/{id}
- [x] Añadir filtros por nombre, documento, estado, etc.
- [x] Añadir paginación (page, pageSize)
- [x] Añadir datos de ejemplo (seed) y migraciones

### 3. Gestión de Usuarios (Admin)
- [x] Endpoint GET /users
- [ ] Endpoint POST /users (crear usuario)
- [ ] Endpoint PUT /users/{id} (editar usuario)
- [ ] Endpoint DELETE /users/{id} (opcional)
- [ ] Crear DTOs para usuario (entrada/salida)

### 4. Seguridad
- [x] Verificación de roles en endpoints
- [ ] Añadir claims personalizados y validación si aplica
- [ ] Almacenamiento seguro y cifrado de refresh tokens
- [ ] Configurar expiración de access token y refresh token

### 5. Estructura y buenas prácticas
- [x] Crear capa de servicios (Services)
- [x] Crear capa de repositorios (Repositories)
- [x] Integrar AutoMapper para mapeo entre entidades y DTOs
- [x] Integrar FluentValidation para validación de entrada (opcional)
- [x] Mejorar la organización de DTOs y modelos

### 6. Documentación y herramientas
- [x] Documentar la API con OpenAPI/Scalar
- [ ] Mejorar y mantener la documentación de endpoints y modelos
- [ ] Añadir ejemplos de uso en backend.http

### 7. Testing
- [x] Crear proyecto de pruebas unitarias con xUnit y Moq
- [x] Añadir pruebas unitarias para AuthController (login correcto y fallido)
- [ ] Añadir más pruebas unitarias para:
  - [ ] ContactController (CRUD y filtros)
  - [ ] UsersController (CRUD)
  - [ ] Servicios y lógica de negocio
- [ ] Añadir pruebas de integración

### 8. DevOps y despliegue
- [ ] Configurar despliegue y CI/CD
- [ ] Configurar migraciones automáticas/controladas
- [ ] Configurar logs (ej: Serilog)
- [ ] Configurar políticas de CORS seguras

### 9. Extras opcionales
- [ ] Registro y verificación de email de usuarios
- [ ] Documentación interactiva con Swagger UI
- [ ] Mejorar la gestión de errores y respuestas estándar

Este archivo se irá actualizando conforme se definan y completen nuevas tareas.
