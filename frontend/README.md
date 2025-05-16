# Especificación del Proyecto Web: Buscador de Contactos

## 1. Objetivo del Proyecto

Diseñar e implementar una aplicación web en React para búsqueda, visualización y consulta de contactos personales, accediendo a través de una API REST segura que requiere autenticación y autorización.

---

## 2. Requisitos Funcionales

### 2.1 Búsqueda de Contactos

El sistema de búsqueda de contactos ofrece dos modos:

- **Búsqueda simple:**
  - Campo único para buscar por nombre, apellido, documento o email.
  - Resultados listados con paginación.
  - Interfaz rápida, con debounce automático y feedback visual.

- **Búsqueda avanzada:**
  - Formulario con múltiples campos: nombre, email, teléfono, ciudad, empresa, perfiles, etc.
  - Selector múltiple de perfiles con chips y modal.
  - Filtros combinables y UI moderna.
  - Historial reutilizable de filtros avanzados, accesible como dropdown (desktop) o drawer (móvil).
  - Ejecución automática al seleccionar un filtro del historial.

- **Exportación:**
  - Botón para exportar los contactos filtrados (tanto en búsqueda simple como avanzada) a CSV.
  - El CSV respeta los filtros activos y es robusto ante filtros vacíos.

- **Accesibilidad y experiencia:**
  - Todos los controles y formularios son accesibles y responsivos.
  - Feedback visual claro en búsquedas, errores y exportación.

### 2.2 Vista de Ficha de Contacto

* Datos personales: nombre, documento, dirección, etc.
* Historial de actividad o notas (si aplica)
* Contactos asociados
* Botón de edición (según permisos)

### 2.3 Autenticación

* Login con usuario y contraseña (JWT)
* Tokens almacenados en memoria o almacenamiento seguro
* Comprobación de sesión activa y expiración automática
* Utilización de refresh token si es necesario

### 2.4 Autorización

* Control de acceso basado en roles (admin, lector, editor)
* Renderizado condicional de componentes y acciones

### 2.5 Administración Básica (opcional)

* Crear o editar fichas según permisos
* Formularios con validaciones de campos

---

## 3. Requisitos Técnicos

### 3.1 Frontend

* **Framework:** React (v19+)
* **Gestión de estado global:** React Context (o Zustand/Redux Toolkit opcional)
* **Ruteo:** React Router DOM
* **Autenticación:** JWT con interceptores en Axios (manejo de token y refresh token)
* **UI/Estilos:** Tailwind CSS
* **Consumo de API:** Axios con manejo global de errores y feedback visual
* **Formularios:** React Hook Form + Yup (o Zod)
* **Validación:** Yup (o Zod) para formularios y filtros
* **Componentes reutilizables:** Chips, modales, tablas, cards, paginación, selectores, etc.
* **Accesibilidad:** Enfoque a11y en todos los controles y formularios
* **Responsive:** Layout y componentes adaptados a móvil y escritorio
* **Experiencia de usuario:** Debounce en búsqueda, historial de filtros, feedback visual, loaders/spinners, toasts
* **Testing:** (Pendiente) React Testing Library y Jest

* Menú lateral (Sidebar) responsive: colapsable en escritorio, navbar superior en móvil, integrado en todas las páginas privadas.

### 3.2 Backend (consumo desde frontend)

* API REST con autenticación y autorización JWT
* Todos los endpoints protegidos requieren el token JWT en el header `Authorization: Bearer <token>`
* El login devuelve tanto `token` como `refreshToken` (no `accessToken`)
* Endpoints principales:
  - `POST /api/auth/login` — Login de usuario. Body: `{ userName, password }`. Devuelve: `{ token, refreshToken }`.
  - `POST /api/auth/refresh` — Refresca el token de acceso. Body: `{ refreshToken }`.
  - `POST /api/auth/logout` — Cierra sesión y revoca refresh token.
  - `GET /api/contacts?filter=...&page=1&pageSize=10` — Buscar contactos con filtros y paginación.
  - `POST /api/contacts/search-advanced` — Búsqueda avanzada de contactos (múltiples campos y perfiles)
  - `POST /api/contacts/export` — Exporta contactos filtrados (simple o avanzado) como CSV
  - `GET /api/contacts/{id}` — Obtener detalles de un contacto por ID.
  - `PUT /api/contacts/{id}` — Editar contacto (según permisos).
  - `GET /api/users` — Listar usuarios (solo Admin).
  - `POST /api/users` — Crear usuario (solo Admin). Body: `{ userName, password, role }`.
  - `GET /api/users/me` — Obtiene los datos del usuario autenticado.
  - `POST /api/users/me/avatar` — Sube o reemplaza el avatar del usuario autenticado (multipart/form-data, campo `file`).
  - `GET /api/users/me/avatar` — Descarga el avatar del usuario autenticado.

---

## 3.3 Ejemplos de uso de endpoints de usuario y avatar

> Estos endpoints requieren autenticación (Bearer Token) y algunos requieren rol Admin.

**Ejemplo de subida de avatar:**
```js
const formData = new FormData();
formData.append('file', archivoImagen);
await axios.post(`${API_URL}/users/me/avatar`, formData, {
  headers: { Authorization: `Bearer ${token}` }
});
```

**Ejemplo de obtención de avatar:**
```js
const res = await axios.get(`${API_URL}/users/me/avatar`, {
  headers: { Authorization: `Bearer ${token}` },
  responseType: 'blob'
});
const url = URL.createObjectURL(res.data);
```

---

## Configuración esperada del backend

El backend debe estar configurado (en `appsettings.json`) con los siguientes valores por defecto:

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

---

## Variables de entorno (frontend)

Crea un archivo `.env` en la raíz del frontend con:

```
VITE_API_BASE_URL=http://localhost:5252/api
```

Esto debe coincidir con la URL base expuesta por el backend.

---

## 4. Flujo de Usuario

1. Login → validación de credenciales → almacenamiento seguro de token
2. Acceso a la pantalla principal con buscador
3. Ingreso de criterio de búsqueda → llamada a `/contacts` o búsqueda avanzada
4. Mostrar resultados → clic en resultado → navegar a `/contacts/:id`
5. Vista de ficha, con opción de edición si tiene permisos
6. Exportar contactos filtrados a CSV

---

## 5. Seguridad

* Autenticación mediante JWT (Bearer Token)
* Refresh token si es necesario (según diseño de API)
* Protección de rutas privadas en React
* Validación de roles en la UI y en llamadas API

---

## 6. Entregables Esperados

* Aplicación React funcional
* Configurable con `.env` para URL de API
* UI adaptable (responsive)
* Feedback visual y manejo de errores
* Código modular y documentado

---

## 7. Extras Opcionales

* Debounce en buscador para reducir llamadas API
* Cacheo local de fichas consultadas
* Testing con React Testing Library
* Login persistente con expiración segura

---

## Cambios recientes y mejoras visuales (2025-05-16)

- Búsqueda avanzada y exportación CSV robusta en frontend
- Historial de filtros avanzados reutilizable y UI moderna
- Corrección de limpieza de filtros (perfiles) en búsqueda avanzada
- Mejoras visuales y de accesibilidad en todos los campos y controles
- Sidebar y página de perfil modernizados, con avatar y datos de usuario consistentes
- Limpieza de código y documentación alineada con la implementación final

## Estilos y experiencia de usuario

- Todos los componentes principales usan fondo gris claro (`bg-gray-50`), cards blancas con sombra y bordes suaves.
- El diseño es responsivo y moderno, con especial atención a la experiencia móvil.
- Se prioriza la coherencia visual y la reutilización de componentes visuales.

---

## Búsqueda IA (Lenguaje natural → SQL)

La aplicación permite realizar búsquedas avanzadas de contactos usando lenguaje natural, gracias a la integración con un modelo LLM local (Ollama).

- Acceso desde el menú lateral: **Búsqueda IA** (icono "Sparkles")
- Página dedicada con formulario, feedback de carga, SQL generada y resultados en tabla moderna
- Seguridad: solo usuarios autenticados pueden acceder
- El backend valida y ejecuta únicamente consultas SELECT generadas por la IA

### Requisitos para la búsqueda IA

- El backend debe tener Ollama instalado y corriendo (ver README raíz y backend)
- El modelo recomendado es `llama3` o `sqlcoder`
- El frontend no requiere configuración especial, solo que el backend tenga la IA disponible

---

Para más detalles, ver el registro de actividad en `Chat.md`.

---

Última actualización: 16 mayo 2025
