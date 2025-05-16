# Especificación del Proyecto Backend: API REST para Buscador de Contactos

## 1. Objetivo del Proyecto

Desarrollar una API REST segura y robusta utilizando **.NET Core**, que permita la gestión y consulta de contactos personales, con autenticación JWT y refresh tokens. Incluye gestión de usuarios, perfiles, empresas, paginación, filtros avanzados y exportación de datos.

> La URL base por defecto de la API es `http://localhost:5252/api` (ver `Properties/launchSettings.json`).

---

## 2. Requisitos Funcionales

### 2.1 Autenticación y Autorización

* Registro de usuarios (opcional, solo Admin)
* Inicio de sesión con emisión de **Access Token (JWT)** y **Refresh Token**
* Refresco de tokens válidos mediante endpoint
* Roles y claims gestionados con Microsoft Identity

### 2.2 Gestión de Contactos

* CRUD de contactos (según rol del usuario):
  * `GET /contacts` con soporte para filtros y paginación
  * `GET /contacts/{id}`
  * `POST /contacts`
  * `PUT /contacts/{id}`
  * `DELETE /contacts/{id}` (si aplica)
* Búsqueda avanzada de contactos (`POST /contacts/search-advanced`) con múltiples campos y perfiles
* Exportación de contactos filtrados (`POST /contacts/export`) como CSV (soporta filtros simples y avanzados)

### 2.3 Paginación y Filtros

* Paginación en consultas masivas con `page`, `pageSize`
* Filtros por nombre, documento, estado, empresa, perfiles, ciudad, etc.

### 2.4 Seguridad

* Verificación de roles y claims en cada endpoint
* Manejo de expiración y renovación de tokens
* Almacenamiento seguro de refresh tokens en base de datos

---

## 3. Requisitos Técnicos

### 3.1 Tecnologías y Frameworks

* **.NET Core 9** — Framework principal para la API REST
* **Entity Framework Core** — ORM y migraciones automáticas/controladas
* **Microsoft Identity Framework** — Autenticación y autorización basada en roles y claims
* **JWT (Json Web Token)** — Tokens de acceso y refresh para autenticación segura
* **AutoMapper** — Mapeo entre entidades y DTOs
* **FluentValidation** — Validación robusta de entrada de datos y DTOs
* **Scalar (OpenAPI)** — Documentación interactiva de la API
* **xUnit** y **Moq** — Testing unitario y de integración
* **Serilog** — (Opcional) Logging estructurado

### 3.2 Estructura de Capas

* `Controllers` — Web API y endpoints
* `Services` — Lógica de negocio y reglas de aplicación
* `Repositories` — Acceso a datos y consultas complejas
* `DTOs` — Data Transfer Objects para entrada/salida
* `Models` — Entidades de EF Core
* `Authentication` — Generación y validación de JWT, gestión de tokens

---

## 4. Esquema de Base de Datos (simplificado)

### Entidades principales:

* **User** (IdentityUser extendido)
* **Contact**
  * Id, Nombre, Apellido, Documento, Email, Teléfono, Dirección, Estado, Empresa, Perfiles (muchos a muchos), Ciudad, Fecha de creación/actualización
* **Company**
  * Id, Nombre, Dirección, etc.
* **Profile**
  * Id, Nombre, Descripción
* **RefreshToken**
  * Id, UsuarioId, Token, Fecha expiración, Revocado

---

## 5. Endpoints Principales

### Autenticación
- `POST /api/auth/login` — Inicia sesión y retorna JWT + Refresh Token
- `POST /api/auth/refresh` — Renueva tokens de acceso y refresh
- `POST /api/auth/logout` — Revoca el refresh token actual

### Usuarios
- `GET /api/users` — Lista todos los usuarios (solo Admin)
- `GET /api/users/{id}` — Obtiene un usuario por su identificador (solo Admin)
- `GET /api/users/me` — Obtiene los datos del usuario autenticado
- `POST /api/users` — Crea usuario (solo Admin)
- `POST /api/users/me/avatar` — Sube o reemplaza el avatar del usuario autenticado
- `GET /api/users/me/avatar` — Descarga el avatar del usuario autenticado

### Contactos

- `GET /api/contacts?filter=...&page=1&pageSize=10` — Lista contactos con filtros simples (nombre, documento, email, etc.) y paginación. Devuelve un objeto paginado con los contactos y metadatos (`data`, `total`, `page`, `pageSize`, `totalPages`, `hasNextPage`, `hasPreviousPage`).

- `POST /api/contacts/search-advanced` — Búsqueda avanzada de contactos. Permite filtrar por múltiples campos (nombre, email, teléfono, ciudad, empresa, perfiles, etc.) enviando un objeto JSON en el body. Soporta paginación y devuelve un objeto paginado igual que el endpoint simple.

#### Ejemplo: Búsqueda avanzada de contactos

**Request:**

POST /api/contacts/search-advanced

```json
{
  "name": "Juan",
  "email": "",
  "phone": "",
  "city": "Madrid",
  "companyId": 2,
  "profileIds": [1, 3],
  "page": 1,
  "pageSize": 10
}
```

**Response:**

```json
{
  "data": [
    {
      "id": 12,
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@example.com",
      "phone": "+34123456789",
      "address": "Calle Falsa 123, Madrid",
      "city": "Madrid",
      "company": {
        "id": 2,
        "name": "Empresa Ejemplo"
      },
      "profiles": [
        { "id": 1, "name": "Cliente" },
        { "id": 3, "name": "VIP" }
      ],
      "status": 0,
      "createdAt": "2025-05-10T12:00:00Z",
      "updatedAt": "2025-05-15T09:00:00Z"
    }
    // ...más contactos...
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1,
  "hasNextPage": false,
  "hasPreviousPage": false
}
```

- `POST /api/contacts/export` — Exporta a CSV todos los contactos que cumplen los filtros activos (tanto simples como avanzados). El body debe incluir los filtros simples y/o avanzados. Devuelve un archivo CSV descargable.

#### Ejemplo: Exportación de contactos a CSV

**Request:**

POST /api/contacts/export

```json
{
  "Search": "",
  "AdvancedFilter": {
    "companyId": 2,
    "profileIds": [1, 3]
  }
}
```

**Response:**

- Descarga de archivo CSV con los contactos filtrados.

- `GET /api/contacts/{id}` — Obtiene el detalle completo de un contacto por su identificador único.

- `PUT /api/contacts/{id}` — Actualiza los datos de un contacto existente. Requiere permisos adecuados. El body debe contener los campos a modificar.

- `DELETE /api/contacts/{id}` — Elimina un contacto por su identificador. Requiere permisos de administrador o editor.

- `POST /api/contacts/{id}/profiles/{profileId}` — Añade un perfil (rol/categoría) a un contacto. Útil para asociar varios perfiles a un mismo contacto.

#### Ejemplo: Añadir perfil a un contacto

**Request:**

POST /api/contacts/12/profiles/3

- No requiere body. Añade el perfil con ID 3 al contacto con ID 12.

**Response:**

- 204 No Content si la operación es exitosa.
- 404 si el contacto o perfil no existe.

- `DELETE /api/contacts/{id}/profiles/{profileId}` — Quita un perfil previamente asociado a un contacto.

#### Ejemplo: Quitar perfil de un contacto

**Request:**

DELETE /api/contacts/12/profiles/3

- Quita el perfil con ID 3 del contacto con ID 12.

**Response:**

- 204 No Content si la operación es exitosa.
- 404 si el contacto o perfil no existe o no está asociado.

### Empresas y Perfiles
- `GET /api/companies` — Listar empresas
- `GET /api/profiles` — Listar perfiles
- (Opcional) CRUD de empresas y perfiles para Admin

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
* Unit Testing con xUnit y Moq
* Migraciones automáticas o controladas con EF Core
* Documentación OpenAPI generada con Scalar

---

## 8. Extras Opcionales

* Registro y verificación de email de usuarios
* Logs con Serilog
* Políticas de CORS seguras para frontend
* Documentación interactiva con Swagger/Scalar UI

---

## 9. Entregables Esperados

* Proyecto .NET Core con estructura limpia y modular
* Base de datos generada por migraciones de EF Core
* API documentada con Scalar (OpenAPI)
* Tests unitarios básicos
* Seguridad completa implementada (login, JWT, refresh tokens)

---

## Cambios recientes y mejoras

- Búsqueda avanzada y exportación CSV robusta en backend
- Historial de filtros avanzados reutilizable y UI moderna en frontend
- Corrección de limpieza de filtros (perfiles) en búsqueda avanzada
- Flujo de autenticación y perfil robusto y coherente con frontend
- Avatar y datos de usuario integrados y protegidos
- Sincronización total de tokens y usuario en frontend/backend
- Mejoras de UX y feedback visual en login/logout/perfil
- Documentación y endpoints alineados con la implementación final

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

---

## Configuración por defecto (`appsettings.json`)

```json
{
  "Jwt": {
    "Key": "SuperSecretKey12345678901234567890123456789012",
    "Issuer": "AIWeekIssuer",
    "Audience": "AIWeekAudience"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=aiweek.db"
  },
  "AvatarsPath": "wwwroot/avatars"
}
```

- **Key:** Cambia este valor en producción por una clave segura y privada.
- **Issuer/Audience:** Identificadores del emisor y audiencia del JWT.
- **DefaultConnection:** Usa SQLite por defecto (`aiweek.db`).
- **AvatarsPath:** Carpeta donde se almacenan los avatares de usuario.

---

Última actualización: 16 mayo 2025
