# Proyecto AIWeek: Buscador de Contactos

## Descripción General

Plataforma compuesta por un backend en .NET Core y un frontend en React para la gestión y búsqueda de contactos personales, con autenticación JWT, roles y gestión de usuarios y avatares.

---

## Estructura del Proyecto

- `/backend/` — API REST en .NET Core 7, Entity Framework Core, Identity, JWT
- `/frontend/` — Aplicación React 19+, Tailwind CSS, Axios, Zustand/Redux/Context

---

## Endpoints principales (referencia rápida)

> Todos los endpoints protegidos requieren el token JWT en el header `Authorization: Bearer <token>`. Algunos requieren rol Admin.

### Autenticación
- `POST /api/auth/login` — Login de usuario. Body: `{ userName, password }`. Devuelve: `{ token, refreshToken }`.
- `POST /api/auth/refresh` — Refresca el token de acceso. Body: `{ refreshToken }`.
- `POST /api/auth/logout` — Cierra sesión y revoca refresh token.

### Usuarios
- `GET /api/users` — Lista todos los usuarios (solo Admin)
- `POST /api/users` — Crea usuario (solo Admin). Body: `{ userName, password, role }`
- `GET /api/users/me` — Obtiene los datos del usuario autenticado
- `POST /api/users/me/avatar` — Sube o reemplaza el avatar del usuario autenticado (multipart/form-data, campo `file`)
- `GET /api/users/me/avatar` — Descarga el avatar del usuario autenticado

### Contactos
- `GET /api/contacts?filter=...&page=1&pageSize=10` — Buscar contactos con filtros y paginación
- `GET /api/contacts/{id}` — Obtener detalles de un contacto por ID
- `PUT /api/contacts/{id}` — Editar contacto (según permisos)
- `DELETE /api/contacts/{id}` — Eliminar contacto (según permisos)

---

## Gestión de avatar de usuario

- El backend permite a cada usuario autenticado subir y obtener su avatar de perfil.
- La ruta de almacenamiento de los archivos de avatar se define en `appsettings.json` con la clave `AvatarsPath` (por defecto `wwwroot/avatars`).

**Ejemplo de subida de avatar (frontend):**
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

## Flujo de integración

1. Login en frontend → obtención de token y refreshToken
2. Acceso a funcionalidades protegidas (búsqueda, edición, gestión de usuario/avatar)
3. Uso de endpoints según permisos y roles

---

## Documentación detallada

- Ver `/backend/README.md` para detalles de la API, migraciones y estructura de base de datos
- Ver `/frontend/README.md` para detalles de integración, ejemplos de uso y configuración de entorno

---

## Cambios recientes

- Modelo User extendido con campos de perfil y avatar
- Endpoints de avatar implementados y documentados
- Documentación de endpoints unificada y sin duplicados
- Mejoras de accesibilidad y usabilidad en frontend
- Refactor y modularización de componentes en frontend
- Actualización de documentación y ejemplos en ambos proyectos
