# Especificación del Proyecto Web: Buscador de Contactos

## 1. Objetivo del Proyecto

Diseñar e implementar una aplicación web en React para búsqueda, visualización y consulta de contactos o fichas personales, accediendo a través de una API REST segura que requiere autenticación y autorización.

---

## 2. Requisitos Funcionales

### 2.1 Búsqueda de Contactos

* Campo de búsqueda por:

  * Nombre
  * Apellido
  * ID o documento
  * Email (opcional)
* Resultados listados con paginación o scroll infinito
* Filtros opcionales: estado, rol, categoría, etc.

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

* **Framework**: React (v19+)
* **Estado global**: Zustand, Redux Toolkit o React Context
* **Ruteo**: React Router DOM
* **Autenticación**: JWT con interceptores en Axios
* **UI/Estilos**: Tailwind CSS
* **Manejo API**: Axios con manejo de errores
* **Formularios**: React Hook Form + Zod o Yup
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

## Variables de entorno

Crea un archivo `.env` en la raíz del frontend con la siguiente variable:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Esto permite cambiar fácilmente el endpoint de la API sin modificar el código fuente. Usa `import.meta.env.VITE_API_BASE_URL` en los servicios para acceder a la URL base.

---

## 4. Flujo de Usuario

1. Login → validación de credenciales → almacenamiento seguro de token
2. Acceso a la pantalla principal con buscador
3. Ingreso de criterio de búsqueda → llamada a `GET /contacts?query=`
4. Mostrar resultados → clic en resultado → navegar a `/contacts/:id`
5. Vista de ficha, con opción de edición si tiene permisos

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

## Cambios recientes

- Flujo de autenticación y perfil robusto y sincronizado con backend.
- Avatar y datos de usuario integrados y protegidos, con placeholder y favicon personalizados "AI".
- Eliminadas referencias y recursos obsoletos (vite.svg, logs de debug, etc).
- Sincronización total de tokens y usuario en frontend/backend.
- Mejoras de UX y feedback visual en login/logout/perfil.
- Sidebar y página de perfil modernizados, con avatar y datos de usuario consistentes.
- Limpieza de código y documentación alineada con la implementación final.
- Pantalla Home ahora muestra una grid de indicadores alineados arriba, con diseño moderno y limpio, sin fondo degradado.
- El selector de vista de contactos (tabla/tarjetas) es un componente reutilizable y está fuera del h1 para accesibilidad.
- En móvil, la vista de contactos solo muestra tarjetas.
- Mejoras de layout y paginación en la página de contactos.
- Búsqueda de contactos ahora es automática (debounce) y no requiere pulsar botón.
- El frontend envía el filtro como `filter` (no `search`) para compatibilidad total con el backend.
- Mejoras de documentación y alineación de endpoints en README.
- Seed de backend con 500 contactos para pruebas de rendimiento y búsqueda.
- Adaptación del frontend para consumir la nueva estructura de paginación enriquecida del endpoint `/contacts`.
- Tipos y servicio de contactos actualizados para reflejar los campos: `totalPages`, `hasNextPage`, `hasPreviousPage`.
- UI de paginación mejorada en la página de contactos.
- Vista de contactos mejorada: ahora puedes alternar entre vista de tabla y tarjetas en escritorio, y en móvil solo está disponible la vista de tarjetas, completamente responsiva.
- Mejoras de usabilidad y feedback visual en la búsqueda.
