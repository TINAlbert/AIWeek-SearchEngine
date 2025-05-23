# Lista de tareas para el backend

Este archivo contiene una lista detallada y actualizada de tareas y funcionalidades pendientes para el desarrollo del backend.

## Tareas pendientes

### 1. Autenticación y Autorización
- [x] Implementar login con JWT (Access Token)
- [x] Implementar Refresh Token:
  - [x] Crear entidad/modelo RefreshToken
  - [x] Guardar refresh tokens en base de datos
  - [x] Endpoint POST /auth/refresh para renovar tokens
  - [x] Endpoint POST /auth/logout para revocar refresh token
  - [x] Manejar expiración y revocación/eliminación de refresh tokens
  - [x] Eliminar todos los refresh tokens activos previos tras login
- [x] (Opcional) Implementar registro de usuarios (solo Admin)
- [x] Añadir claims personalizados si es necesario

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
- [x] Añadir filtros por nombre, documento, estado, empresa, perfiles, ciudad, etc.
- [x] Añadir paginación (page, pageSize)
- [x] Refactor de paginación enriquecida en /contacts y adaptación de tests y servicios.
- [x] Añadir datos de ejemplo (seed) y migraciones
- [x] Búsqueda avanzada de contactos (`POST /contacts/search-advanced`) con múltiples campos y perfiles
- [x] Exportación de contactos filtrados (`POST /contacts/export`) como CSV (soporta filtros simples y avanzados)
- [x] Corrección de limpieza de filtros (perfiles) en búsqueda avanzada

### 3. Gestión de Usuarios (Admin)
- [x] Endpoint GET /users
- [x] Endpoint POST /users (crear usuario solo Admin)
- [x] Endpoint PUT /users/{id} (editar usuario)
- [x] Endpoint DELETE /users/{id} (opcional)
- [x] Crear DTOs para usuario (entrada/salida)
- [x] Extender modelo User con campos de perfil y avatar (FirstName, LastName, IsActive, CreatedAt, UpdatedAt, AvatarFileName)
- [x] Endpoints para subir y obtener avatar del usuario autenticado
- [x] Documentar endpoints y ejemplos de uso en README
- [x] Unificar documentación de endpoints y evitar duplicados
- [x] Exponer datos de usuario mediante UserProfileDto en /users/me y /users/{id}

### 4. Seguridad
- [x] Verificación de roles en endpoints
- [x] Almacenamiento seguro y eliminación de refresh tokens
- [x] Configurar expiración de access token y refresh token

### 5. Estructura y buenas prácticas
- [x] Crear capa de servicios (Services)
- [x] Crear capa de repositorios (Repositories)
- [x] Integrar AutoMapper para mapeo entre entidades y DTOs
- [x] Integrar FluentValidation para validación de entrada (opcional)
- [x] Mejorar la organización de DTOs y modelos

### 6. Documentación y herramientas
- [x] Documentar la API con OpenAPI/Scalar
- [x] Mejorar y mantener la documentación de endpoints y modelos
- [x] Añadir ejemplos de uso en backend.http

### 7. Testing
- [x] Crear proyecto de pruebas unitarias con xUnit y Moq
- [x] Añadir pruebas unitarias para AuthController (login correcto y fallido)
- [x] Añadir más pruebas unitarias para:
  - [x] ContactController (CRUD y filtros)
  - [x] UsersController (CRUD)
  - [x] Servicios y lógica de negocio
- [ ] (Opcional) Añadir pruebas de integración
- [ ] Mejorar tests de integración para endpoints de usuario/avatar

### 8. DevOps y despliegue
<!-- No aplica en este proyecto por ahora -->
<!--
- [ ] Configurar despliegue y CI/CD
- [ ] Configurar migraciones automáticas/controladas
- [ ] Configurar logs (ej: Serilog)
- [ ] Configurar políticas de CORS seguras
-->

### 9. Extras opcionales
- [ ] Registro y verificación de email de usuarios
- [x] Documentación interactiva con Scalar UI
- [x] Mejorar la gestión de errores y respuestas estándar
- [ ] Revisar seguridad y validaciones en subida de archivos
- [ ] (Opcional) Permitir actualización de perfil (FirstName, LastName, etc.) desde frontend

---

**Actualización:**
- Búsqueda avanzada y exportación CSV robusta en backend
- Historial de filtros avanzados reutilizable y UI moderna en frontend
- Corrección de limpieza de filtros (perfiles) en búsqueda avanzada
- Flujo de autenticación y perfil robusto y coherente con frontend
- Avatar y datos de usuario integrados y protegidos
- Sincronización total de tokens y usuario en frontend/backend
- Mejoras de UX y feedback visual en login/logout/perfil
- Documentación y endpoints alineados con la implementación final

Última actualización: 16 mayo 2025
