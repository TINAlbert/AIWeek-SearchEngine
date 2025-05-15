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

## Cambios recientes y mejoras visuales (2025-05-15)

- Sidebar:
  - El indicador visual del item activo (borde azul) ahora aparece en la derecha, con la esquina derecha redondeada y sin redondeo en la izquierda.
  - Se mantiene la coherencia visual con el resto de la app.
- Home y Dashboard:
  - Layout tipo bento, cards blancas, grid responsiva, iconos y tipografía moderna.
  - El array de indicadores en Home permite definir el span de columnas y color, y se itera para renderizar las cards.
  - El icono de cada indicador en Home se sitúa a la derecha del label.
- ContactsPage y Cards:
  - Cards y tabla integradas visualmente en una card principal.
  - Cards rediseñadas: avatar, chips, hover, máximo 3 por fila, altura máxima adaptada al viewport.
  - El campo de búsqueda y la botonera están agrupados y armonizados visualmente.

## Estilos y experiencia de usuario

- Todos los componentes principales usan fondo gris claro (`bg-gray-50`), cards blancas con sombra y bordes suaves.
- El diseño es responsivo y moderno, con especial atención a la experiencia móvil.
- Se prioriza la coherencia visual y la reutilización de componentes visuales.

---

Para más detalles, ver el registro de actividad en `Chat.md`.

# AIWeek Frontend

## Cambios visuales y de layout (mayo 2025)

### Sidebar
- Indicador azul del item activo a la derecha, solo la esquina derecha redondeada (`rounded-r-lg`), sin redondeo en la izquierda (`rounded-l-none`).
- Refactor visual y estructural para mayor claridad y coherencia.

### ContactsPage
- Barra de búsqueda y botones agrupados en una barra moderna, con mayor claridad y separación.
- Botones de vista y exportar más pequeños y alineados a la derecha.
- Cards y tabla integradas visualmente en una card principal.
- Cards rediseñadas: avatar, chips, hover, máximo 3 por fila, altura máxima adaptada al viewport, sin scroll vertical innecesario.
- Tabla sin cuadro envolvente, integrada en la card principal.
- Paginación móvil y desktop correctamente alineadas y visibles.

### Dashboard y Home
- Layout tipo bento, cards blancas, grid responsiva, iconos y tipografía moderna.
- Fondo, márgenes y espaciado armonizados con ContactsPage.
- En Home, el array de indicadores permite definir el span de columnas y color, y se itera para renderizar las cards. El icono de cada indicador se sitúa a la derecha del label.

### Coherencia visual
- Se mantiene la coherencia visual y funcional en toda la app, tanto en móvil como en escritorio.

### Pendiente
- Personalizar más widgets o indicadores en Home y Dashboard si se requiere.
- Añadir nuevas funcionalidades o widgets según feedback.
- Ajustar detalles visuales adicionales según pruebas finales o nuevas necesidades.

---

Última actualización: 15 mayo 2025
