# Especificación del Proyecto Backend: API REST para Buscador de Contactos

## 1. Objetivo del Proyecto

Desarrollar una API REST segura utilizando **.NET Core**, que permita la gestión y consulta de contactos/fichas personales, con acceso autenticado mediante JWT y Refresh Tokens. Se utilizará **Entity Framework Core** para la persistencia de datos y **Microsoft Identity** para la autenticación y autorización.

---

## 2. Requisitos Funcionales

### 2.1 Autenticación y Autorización

* Registro de usuarios (opcional)
* Inicio de sesión con emisión de **Access Token (JWT)** y **Refresh Token**
* Refresco de tokens válidos mediante un endpoint
* Roles y claims gestionados con Microsoft Identity

### 2.2 Gestión de Contactos

* CRUD de contactos (según rol del usuario):

  * `GET /contacts` con soporte para filtros y búsquedas
  * `GET /contacts/{id}`
  * `POST /contacts`
  * `PUT /contacts/{id}`
  * `DELETE /contacts/{id}` (si aplica)

### 2.3 Paginación y Filtros

* Paginación en consultas masivas con `page`, `pageSize`
* Filtros por nombre, documento, estado, etc.

### 2.4 Seguridad

* Verificación de roles y claims en cada endpoint
* Manejo de expiración y renovación de tokens
* Almacenamiento seguro de refresh tokens en base de datos

---

## 3. Requisitos Técnicos

### 3.1 Tecnologías y Frameworks

* **.NET Core** (7.0 o superior)
* **Entity Framework Core** para ORM y migraciones
* **Microsoft Identity Framework** para autenticación y autorización
* **JWT** para tokens de acceso
* **AutoMapper** para mapeo DTOs
* **FluentValidation** para validaciones de entrada (opcional)
* **Scalar** para documentación de la API

### 3.2 Estructura de Capas

* `Controllers` (Web API)
* `Services` (lógica de negocio)
* `Repositories` (acceso a datos via EF Core)
* `DTOs` (Data Transfer Objects)
* `Models` (entidades de EF)
* `Authentication` (generación y validación de JWT)

---

## 4. Esquema de Base de Datos (simplificado)

### Entidades principales:

* **User** (IdentityUser extendido)
* **Contact**

  * Id
  * Nombre
  * Apellido
  * Documento
  * Email
  * Teléfono
  * Dirección
  * Estado
  * Fecha de creación / actualización
* **RefreshToken**

  * Id
  * UsuarioId
  * Token
  * Fecha expiración
  * Revocado

---

## 5. Endpoints Principales

### Autenticación

- `POST /auth/login` — Inicia sesión y retorna JWT + Refresh Token (requiere credenciales válidas)
- `POST /auth/refresh` — Renueva tokens de acceso y refresh (requiere refresh token válido)
- `POST /auth/logout` — Revoca el refresh token actual (requiere autenticación)

### Usuarios

- `GET /users` — Lista todos los usuarios (requiere rol Admin)
- `POST /users` — Crea un nuevo usuario (requiere rol Admin)
- `PUT /users/{id}` — Actualiza un usuario existente (requiere rol Admin)
- `GET /users/{id}` — Obtiene un usuario por su identificador (requiere rol Admin)
- `GET /users/me` — Obtiene los datos del usuario autenticado (requiere autenticación)
- `POST /users/me/avatar` — Sube o reemplaza el avatar del usuario autenticado (requiere autenticación, multipart/form-data)
- `GET /users/me/avatar` — Descarga el avatar del usuario autenticado (requiere autenticación)

### Contactos

- `GET /contacts?query=&page=&pageSize=` — Lista contactos con filtros y paginación (requiere autenticación)
- `GET /contacts/{id}` — Obtiene un contacto por su identificador (requiere autenticación)
- `POST /contacts` — Crea un nuevo contacto (requiere permisos según rol)
- `PUT /contacts/{id}` — Actualiza un contacto existente (requiere permisos según rol)
- `DELETE /contacts/{id}` — Elimina un contacto (requiere permisos según rol)

---

## 6. Seguridad

* JWT con firma HMAC-SHA256
* Expiración del access token (ej: 15 minutos)
* Refresh token válido por varios días (ej: 7 días)
* Middleware de autorización con roles
* Almacenamiento cifrado de refresh tokens

---

## 7. Consideraciones de Desarrollo

* Uso de `appsettings.json` para configuraciones sensibles (secret key, expiración tokens, cadena de conexión)
* Inyección de dependencias (DI) para servicios y repositorios
* Unit Testing con xUnit o NUnit
* Migraciones automáticas o controladas con EF Core

---

## 8. Extras Opcionales

* Registro y verificación de email de usuarios
* Logs con Serilog
* Políticas de CORS seguras para frontend
* Documentación interactiva con Swagger UI

---

## 9. Entregables Esperados

* Proyecto .NET Core con estructura limpia y modular
* Base de datos generada por migraciones de EF Core
* API documentada con Scalar
* Tests unitarios básicos
* Seguridad completa implementada (login, JWT, refresh tokens)

---

## Cambios recientes

- El endpoint `GET /contacts` ahora devuelve un objeto paginado enriquecido (`PagedResultDto<ContactDto>`) con los campos: `data`, `total`, `page`, `pageSize`, `totalPages`, `hasNextPage`, `hasPreviousPage`.

- Adaptados los tests y servicios para soportar esta nueva estructura.

---

## Gestión de avatar de usuario

El backend permite a cada usuario autenticado subir y obtener su avatar de perfil.

### Configuración

La ruta de almacenamiento de los archivos de avatar se define en `appsettings.json` con la clave `AvatarsPath`. Por defecto es `wwwroot/avatars`.

```json
{
  "AvatarsPath": "wwwroot/avatars"
}
```

### Endpoints

- **Subir/Reemplazar avatar**
  - `POST /api/users/me/avatar`
  - Autenticación requerida
  - Content-Type: `multipart/form-data`
  - Campo: `file` (imagen .jpg, .jpeg, .png, .gif)
  - Respuesta: `{ message, fileName }`

  **Ejemplo con curl:**
  ```sh
  curl -X POST https://localhost:5001/api/users/me/avatar \
    -H "Authorization: Bearer <token>" \
    -F "file=@ruta/a/mi_avatar.png"
  ```

- **Obtener avatar**
  - `GET /api/users/me/avatar`
  - Autenticación requerida
  - Devuelve el archivo de imagen si existe

  **Ejemplo con curl:**
  ```sh
  curl -X GET https://localhost:5001/api/users/me/avatar \
    -H "Authorization: Bearer <token>" --output avatar.png
  ```
