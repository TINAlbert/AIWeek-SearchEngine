<!--
README Multilingüe: English below / Español más abajo

- [English version](#english-version)
- [Versión en castellano](#versi%C3%B3n-en-castellano)
-->

# English version

## AIWeek Frontend

Modern React application for advanced contact search and management, featuring AI-powered natural language queries. Connects to a secure REST API backend with JWT authentication and role-based access.

---

### Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Installation & Usage](#installation--usage)
- [AI Search (Ollama)](#ai-search-ollama)
- [Environment Variables](#environment-variables)
- [Security](#security)
- [Testing](#testing)
- [Documentation](#documentation)
- [Credits](#credits)

---

### Features
- Simple and advanced contact search (name, email, company, profiles, etc.)
- **AI Search**: natural language queries, SQL generation and execution via local LLM (Ollama)
- Export contacts to CSV
- User, role, and avatar management
- Modern, responsive, accessible UI
- JWT security and refresh token
- Reusable advanced filter history

---

### Architecture
- React 19+, Vite, Tailwind CSS, Axios, React Context, React Router DOM
- Connects to backend REST API ([see backend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md))

---

### Requirements
- Node.js 18+
- npm 9+
- Backend API running (see backend setup)

---

### Installation & Usage

```sh
cd frontend
npm install
# Set API URL in .env
# VITE_API_BASE_URL=http://localhost:5252/api
npm run dev
```
Default app: `http://localhost:5173`

---

### AI Search (Ollama)

The app allows advanced contact search using natural language, powered by a local LLM (Ollama). This feature lets users describe queries in plain English or Spanish (e.g., "Contacts in Madrid with VIP profile"), and the system will generate and execute the corresponding SQL automatically.

**How it works:**
- Access from the sidebar: **AI Search** ("Sparkles" icon)
- Enter your query in natural language
- The backend sends the prompt and the real database schema to Ollama
- Ollama (with a model like `llama3` or `sqlcoder`) generates a safe SQL SELECT query
- The backend validates and executes only SELECT queries, returning results and the generated SQL
- Results and the generated SQL are shown in a modern, responsive table
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
4. Check backend connectivity with `/api/ai/ping` endpoint.

**Security:**
- Only authenticated users can access AI endpoints
- The backend strictly validates that only SELECT queries are executed
- The database schema is sent to the LLM to ensure accurate and safe SQL generation

For more details, see the [backend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md).

---

### Environment Variables
Create a `.env` file in the frontend root:
```
VITE_API_BASE_URL=http://localhost:5252/api
```
This must match the backend API URL.

---

### Security
- JWT authentication (Bearer Token)
- Refresh token support
- Role-based UI and API access
- Private route protection

---

### Testing
- Ready for React Testing Library and Jest

---

### Documentation
- [Backend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md)
- [Frontend README](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md)

---

### Credits
Developed by Albert G.M. ([GitHub: TINAlbert](https://github.com/TINAlbert))

---

# Versión en castellano

## AIWeek Frontend

Aplicación moderna en React para la gestión y búsqueda avanzada de contactos, con integración de IA para consultas en lenguaje natural. Se conecta a una API REST segura con autenticación JWT y control de acceso por roles.

---

### Índice
1. [English version](#english-version)
   1. [AIWeek Frontend](#aiweek-frontend)
      1. [Table of Contents](#table-of-contents)
      2. [Features](#features)
      3. [Architecture](#architecture)
      4. [Requirements](#requirements)
      5. [Installation \& Usage](#installation--usage)
      6. [AI Search (Ollama)](#ai-search-ollama)
      7. [Environment Variables](#environment-variables)
      8. [Security](#security)
      9. [Testing](#testing)
      10. [Documentation](#documentation)
      11. [Credits](#credits)
2. [Versión en castellano](#versión-en-castellano)
   1. [AIWeek Frontend](#aiweek-frontend-1)
      1. [Índice](#índice)
      2. [Características](#características)
      3. [Arquitectura](#arquitectura)
      4. [Requisitos](#requisitos)
      5. [Instalación y uso](#instalación-y-uso)
      6. [Búsqueda IA (Ollama)](#búsqueda-ia-ollama)
      7. [Variables de entorno](#variables-de-entorno)
      8. [Seguridad](#seguridad)
      9. [Testing](#testing-1)
      10. [Documentación](#documentación)
      11. [Créditos](#créditos)

---

### Características
- Búsqueda simple y avanzada de contactos (nombre, email, empresa, perfiles, etc.)
- **Búsqueda IA**: consulta en lenguaje natural, generación y ejecución de SQL vía LLM local (Ollama)
- Exportación de contactos a CSV
- Gestión de usuarios, roles y avatares
- UI moderna, responsiva y accesible
- Seguridad JWT y refresh token
- Historial reutilizable de filtros avanzados

---

### Arquitectura
- React 19+, Vite, Tailwind CSS, Axios, React Context, React Router DOM
- Conexión a backend REST API ([ver README backend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md))

---

### Requisitos
- Node.js 18+
- npm 9+
- Backend API en funcionamiento (ver instrucciones backend)

---

### Instalación y uso

```sh
cd frontend
npm install
# Configura la URL de la API en .env
# VITE_API_BASE_URL=http://localhost:5252/api
npm run dev
```
La app estará en `http://localhost:5173`.

---

### Búsqueda IA (Ollama)

La aplicación permite realizar búsquedas avanzadas de contactos usando lenguaje natural, gracias a la integración con un modelo LLM local (Ollama). Esta función permite describir consultas en español o inglés (ej: "Contactos en Madrid con perfil VIP") y el sistema generará y ejecutará automáticamente la SQL correspondiente.

**¿Cómo funciona?**
- Accede desde el menú lateral: **Búsqueda IA** (icono "Sparkles")
- Escribe la consulta en lenguaje natural
- El backend envía el prompt y el esquema real de la base de datos a Ollama
- Ollama (con un modelo como `llama3` o `sqlcoder`) genera una consulta SQL SELECT segura
- El backend valida y ejecuta solo consultas SELECT, devolviendo resultados y la SQL generada
- Los resultados y la SQL generada se muestran en una tabla moderna y responsiva
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
4. Comprueba la conectividad desde el backend con el endpoint `/api/ai/ping`.

**Seguridad:**
- Solo usuarios autenticados pueden acceder a los endpoints de IA
- El backend valida estrictamente que solo se ejecuten consultas SELECT
- El esquema de la base de datos se envía al LLM para asegurar una generación de SQL precisa y segura

Para más detalles, ver el [README del backend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md).

---

### Variables de entorno
Crea un archivo `.env` en la raíz del frontend:
```
VITE_API_BASE_URL=http://localhost:5252/api
```
Debe coincidir con la URL expuesta por el backend.

---

### Seguridad
- Autenticación JWT (Bearer Token)
- Soporte de refresh token
- Control de acceso por roles en la UI y API
- Protección de rutas privadas

---

### Testing
- Preparado para React Testing Library y Jest

---

### Documentación
- [README Backend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/backend/SearchServiceEngine/README.md)
- [README Frontend](https://github.com/TINAlbert/AIWeek-SearchEngine/blob/main/frontend/README.md)

---

### Créditos
Desarrollado por Albert G.M. ([GitHub: TINAlbert](https://github.com/TINAlbert))
