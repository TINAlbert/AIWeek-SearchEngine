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

### 3.2 Backend (solo consumo)

* API REST con autenticación y autorización
* Endpoints esperados (según backend real):

  * `POST /api/auth/login` — Login de usuario. Body: `{ "userName": string, "password": string }`. Devuelve: `{ token, refreshToken }`.
  * `GET /api/contacts?query=...&page=1&pageSize=10` — Buscar contactos con filtros y paginación. Requiere header `Authorization: Bearer <token>`.
  * `GET /api/contacts/{id}` — Obtener detalles de un contacto por ID. Requiere header `Authorization`.
  * `PUT /api/contacts/{id}` — Editar contacto (según permisos). Body: datos a actualizar. Requiere header `Authorization`.
  * `GET /api/users` — Listar usuarios (solo Admin). Requiere header `Authorization`.
  * `POST /api/users` — Crear usuario (solo Admin). Body: `{ userName, password, role }`. Requiere header `Authorization`.

* Notas:
  * Todos los endpoints protegidos requieren el token JWT en el header `Authorization: Bearer <token>`.
  * El login devuelve tanto `token` como `refreshToken` (ya no `accessToken`).
  * El endpoint de refresh (`POST /api/auth/refresh`) y logout (`POST /api/auth/logout`) están disponibles para gestión de sesión avanzada.

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
