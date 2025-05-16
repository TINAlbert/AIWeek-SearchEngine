<!--
README Multilingüe: English below / Español más abajo

- [English version](#english-version)
- [Versión en castellano](#versi%C3%B3n-en-castellano)
-->

# English version

## AIWeek Backend (SearchServiceEngine)

Secure and robust REST API built with .NET Core for contact management, user authentication (JWT + refresh tokens), advanced filtering, CSV export, and AI-powered natural language search via Ollama.

---

### Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Installation & Usage](#installation--usage)
- [Endpoints](#endpoints)
- [AI Search (Ollama)](#ai-search-ollama)
- [Database & Seeding](#database--seeding)
- [Configuration](#configuration)
- [Security](#security)
- [Testing](#testing)
- [Documentation](#documentation)
- [Credits](#credits)

---

### Features
- JWT authentication and refresh tokens
- Role-based access (admin, editor, reader)
- CRUD for contacts, users, companies, profiles
- Simple and advanced contact search (filters, pagination)
- **AI Search**: natural language queries, SQL generation and execution via local LLM (Ollama)
- Export contacts to CSV
- User avatar upload/download
- Automatic test data seeding
- OpenAPI docs (Scalar)

---

### Architecture
- .NET Core 9+, Entity Framework Core, Microsoft Identity, JWT, AutoMapper, Scalar (OpenAPI), xUnit
- Layered structure: Controllers, Services, Repositories, DTOs, Models
- Connects to frontend ([see frontend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md))

---

### Requirements
- .NET 9 SDK
- SQLite (default, or configure another DB)
- Ollama running locally for AI features

---

### Installation & Usage

```sh
cd backend/SearchServiceEngine
dotnet restore
dotnet ef database update
dotnet run
```
Default API: `http://localhost:5252/api`

---

### Endpoints
- `POST /api/auth/login` — Login, returns JWT + refresh token
- `POST /api/auth/refresh` — Refresh tokens
- `POST /api/auth/logout` — Revoke refresh token
- `GET /api/contacts` — List/search contacts (filters, pagination)
- `POST /api/contacts/search-advanced` — Advanced search
- `POST /api/contacts/export` — Export filtered contacts to CSV
- `GET /api/contacts/{id}` — Get contact details
- `PUT /api/contacts/{id}` — Edit contact
- `DELETE /api/contacts/{id}` — Delete contact
- `GET /api/users` — List users (admin)
- `POST /api/users` — Create user (admin)
- `GET /api/users/me` — Get current user
- `POST /api/users/me/avatar` — Upload avatar
- `GET /api/users/me/avatar` — Download avatar
- `GET /api/companies` — List companies
- `GET /api/profiles` — List profiles

---

### AI Search (Ollama)

The backend enables advanced contact search using natural language, powered by a local LLM (Ollama). This feature lets users describe queries in plain English or Spanish (e.g., "Contacts in Madrid with VIP profile"), and the system will generate and execute the corresponding SQL automatically.

**How it works:**
- The frontend sends a natural language prompt to the backend
- The backend attaches the real database schema (in SQL CREATE TABLE format) to the prompt
- Ollama (with a model like `llama3` or `sqlcoder`) generates a safe SQL SELECT query
- The backend validates and executes only SELECT queries, returning results and the generated SQL
- Results and the generated SQL are returned to the frontend for display
- Only authenticated users can access this feature
- Extended timeout for AI requests (up to 5 minutes)

**Ollama setup:**
1. Download and install Ollama: https://ollama.com/download
2. Download a suitable model (recommended: `llama3` or `sqlcoder`):
   ```sh
   ollama pull llama3
   # or
   ollama pull sqlcoder
   ```
3. Start the Ollama service:
   ```sh
   ollama serve
   # (optional) ollama run llama3
   ```
   The backend expects Ollama at `http://localhost:11434`.
4. Check backend connectivity with the `/api/ai/ping` endpoint (returns 200 OK if available).

**Security:**
- Only authenticated users can access AI endpoints
- The backend strictly validates that only SELECT queries are executed
- The database schema is sent to the LLM to ensure accurate and safe SQL generation

**Example database schema sent to Ollama:**
```sql
CREATE TABLE Companies (...);
CREATE TABLE Contacts (...);
CREATE TABLE Profiles (...);
CREATE TABLE ContactProfiles (...);
```

For more details, see the [frontend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md).

---

### Database & Seeding
- Automatic test data seeding (users, companies, profiles, 1000 random contacts)
- Controlled by `SeedInitialData` in `appsettings.json`

---

### Configuration
Default `appsettings.json`:
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
  "AvatarsPath": "wwwroot/avatars",
  "SeedInitialData": true
}
```

---

### Security
- JWT authentication (Bearer Token)
- Refresh token (revocable)
- Role-based authorization
- Secure storage of refresh tokens
- Only authenticated users can access AI endpoints

---

### Testing
- Unit tests with xUnit and Moq

---

### Documentation
- [Backend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md)
- [Frontend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md)

---

### Credits
Developed by Albert G.M. ([GitHub: TINAlbert](https://github.com/TINAlbert))

---

# Versión en castellano

## AIWeek Backend (SearchServiceEngine)

API REST segura y robusta desarrollada en .NET Core para la gestión de contactos, autenticación de usuarios (JWT + refresh tokens), filtrado avanzado, exportación CSV y búsqueda avanzada con IA (Ollama).

---

### Índice
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos)
- [Instalación y uso](#instalación-y-uso)
- [Endpoints](#endpoints)
- [Búsqueda IA (Ollama)](#búsqueda-ia-ollama)
- [Base de datos y seed](#base-de-datos-y-seed)
- [Configuración](#configuración)
- [Seguridad](#seguridad)
- [Testing](#testing)
- [Documentación](#documentación)
- [Créditos](#créditos)

---

### Características
- Autenticación JWT y refresh tokens
- Control de acceso por roles (admin, editor, lector)
- CRUD de contactos, usuarios, empresas y perfiles
- Búsqueda simple y avanzada de contactos (filtros, paginación)
- **Búsqueda IA**: consulta en lenguaje natural, generación y ejecución de SQL vía LLM local (Ollama)
- Exportación de contactos a CSV
- Subida/descarga de avatar de usuario
- Seed automático de datos de prueba
- Documentación OpenAPI (Scalar)

---

### Arquitectura
- .NET Core 9+, Entity Framework Core, Microsoft Identity, JWT, AutoMapper, Scalar (OpenAPI), xUnit
- Estructura por capas: Controllers, Services, Repositories, DTOs, Models
- Conexión con frontend ([ver README frontend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md))

---

### Requisitos
- .NET 9 SDK
- SQLite (por defecto, o configurar otra BD)
- Ollama corriendo localmente para funciones de IA

---

### Instalación y uso

```sh
cd backend/SearchServiceEngine
 dotnet restore
 dotnet ef database update
 dotnet run
```
Por defecto, la API estará en `http://localhost:5252/api`.

---

### Endpoints
- `POST /api/auth/login` — Login, retorna JWT + refresh token
- `POST /api/auth/refresh` — Refresca tokens
- `POST /api/auth/logout` — Revoca refresh token
- `GET /api/contacts` — Listar/buscar contactos (filtros, paginación)
- `POST /api/contacts/search-advanced` — Búsqueda avanzada
- `POST /api/contacts/export` — Exporta contactos filtrados a CSV
- `GET /api/contacts/{id}` — Detalle de contacto
- `PUT /api/contacts/{id}` — Editar contacto
- `DELETE /api/contacts/{id}` — Eliminar contacto
- `GET /api/users` — Listar usuarios (admin)
- `POST /api/users` — Crear usuario (admin)
- `GET /api/users/me` — Obtener usuario actual
- `POST /api/users/me/avatar` — Subir avatar
- `GET /api/users/me/avatar` — Descargar avatar
- `GET /api/companies` — Listar empresas
- `GET /api/profiles` — Listar perfiles

---

### Búsqueda IA (Ollama)

El backend permite realizar búsquedas avanzadas de contactos usando lenguaje natural, gracias a la integración con un modelo LLM local (Ollama). Esta función permite describir consultas en español o inglés (ej: "Contactos en Madrid con perfil VIP") y el sistema generará y ejecutará automáticamente la SQL correspondiente.

**¿Cómo funciona?**
- El frontend envía un prompt en lenguaje natural al backend
- El backend adjunta el esquema real de la base de datos (en formato SQL CREATE TABLE) al prompt
- Ollama (con un modelo como `llama3` o `sqlcoder`) genera una consulta SQL SELECT segura
- El backend valida y ejecuta solo consultas SELECT, devolviendo resultados y la SQL generada
- Los resultados y la SQL generada se devuelven al frontend para su visualización
- Solo usuarios autenticados pueden acceder a esta función
- Timeout extendido para peticiones de IA (hasta 5 minutos)

**Configuración de Ollama:**
1. Descarga e instala Ollama: https://ollama.com/download
2. Descarga un modelo adecuado (recomendado: `llama3` o `sqlcoder`):
   ```sh
   ollama pull llama3
   # o
   ollama pull sqlcoder
   ```
3. Inicia el servicio Ollama:
   ```sh
   ollama serve
   # (opcional) ollama run llama3
   ```
   El backend espera Ollama en `http://localhost:11434`.
4. Comprueba la conectividad desde el backend con el endpoint `/api/ai/ping` (devuelve 200 OK si está disponible).

**Seguridad:**
- Solo usuarios autenticados pueden acceder a los endpoints de IA
- El backend valida estrictamente que solo se ejecuten consultas SELECT
- El esquema de la base de datos se envía al LLM para asegurar una generación de SQL precisa y segura

**Ejemplo de esquema de base de datos enviado a Ollama:**
```sql
CREATE TABLE Companies (...);
CREATE TABLE Contacts (...);
CREATE TABLE Profiles (...);
CREATE TABLE ContactProfiles (...);
```

Para más detalles, ver el [README del frontend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md).

---

### Base de datos y seed
- Seed automático de datos de prueba (usuarios, empresas, perfiles, 1000 contactos aleatorios)
- Controlado por `SeedInitialData` en `appsettings.json`

---

### Configuración
`appsettings.json` por defecto:
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
  "AvatarsPath": "wwwroot/avatars",
  "SeedInitialData": true
}
```

---

### Seguridad
- Autenticación JWT (Bearer Token)
- Refresh token (revocable)
- Autorización por roles
- Almacenamiento seguro de refresh tokens
- Solo usuarios autenticados pueden acceder a la IA

---

### Testing
- Pruebas unitarias con xUnit y Moq

---

### Documentación
- [README Backend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md)
- [README Frontend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md)

---

### Créditos
Desarrollado por Albert G.M. ([GitHub: TINAlbert](https://github.com/TINAlbert))
