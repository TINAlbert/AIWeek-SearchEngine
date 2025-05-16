# Proyecto AIWeek: Buscador de Contactos

Plataforma fullstack para la gestión y búsqueda de contactos personales, compuesta por un backend en .NET Core y un frontend en React. Incluye autenticación JWT, gestión de usuarios y avatares, roles, paginación, filtros avanzados, exportación CSV y una experiencia de usuario moderna y robusta.

---

## Novedad: Búsqueda IA (SQL por lenguaje natural)

El sistema permite realizar búsquedas avanzadas de contactos usando lenguaje natural, gracias a la integración con un modelo LLM local (Ollama). El usuario puede describir la consulta deseada y la IA genera y ejecuta la SQL automáticamente.

- Acceso desde el menú lateral: **Búsqueda IA** (icono "Sparkles")
- Página dedicada con formulario, feedback de carga, SQL generada y resultados en tabla moderna
- Seguridad: solo usuarios autenticados pueden acceder
- El backend valida y ejecuta únicamente consultas SELECT generadas por la IA

### Configuración y uso de Ollama (modelo LLM local)

Para que la funcionalidad de Búsqueda IA funcione, es necesario tener instalado y corriendo Ollama en el servidor backend.

#### 1. Instalar Ollama

Sigue las instrucciones oficiales según tu sistema operativo: https://ollama.com/download

#### 2. Descargar el modelo LLM adecuado

Se recomienda usar `llama3` o `sqlcoder` para generación de SQL. Ejemplo:

```sh
ollama pull llama3
# o
ollama pull sqlcoder
```

#### 3. Iniciar el servicio Ollama

Por defecto, el backend espera que Ollama escuche en `http://localhost:11434`.

```sh
ollama serve
```

#### 4. Probar conectividad

El backend expone un endpoint `/api/ai/ping` para comprobar la conexión con Ollama. El frontend puede mostrar un mensaje si el servicio no está disponible.

#### 5. Seguridad y timeout

- Solo usuarios autenticados pueden acceder a los endpoints de IA.
- El backend solo ejecuta SQL generada que sea un SELECT.
- El timeout para peticiones de IA es largo (hasta 5 minutos) para soportar respuestas complejas.

#### 6. Esquema de base de datos enviado a la IA

El backend envía el esquema real de la base de datos en formato SQL (CREATE TABLE) para que la IA genere consultas correctas y seguras.

---

## Estructura del Proyecto

- `/backend/` — API REST en .NET Core 7, Entity Framework Core, Identity, JWT
- `/frontend/` — Aplicación React 19+, Tailwind CSS, Axios, Context API

---

## Requisitos y Tecnologías

- **Backend:** .NET Core 7+, Entity Framework Core, Microsoft Identity, JWT, AutoMapper, Scalar (OpenAPI), xUnit
- **Frontend:** React 19+, Vite, Tailwind CSS, Axios, React Context, React Router DOM, React Hook Form, Yup

---

## Instalación y Ejecución

### 1. Backend

1. Ve a la carpeta `backend/SearchServiceEngine`.
2. Restaura paquetes y aplica migraciones:
   ```sh
   dotnet restore
   dotnet ef database update
   ```
3. Ejecuta el backend:
   ```sh
   dotnet run
   ```
   Por defecto, la API estará en `http://localhost:5252/api`.

### 2. Frontend

1. Ve a la carpeta `frontend/`.
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` con la URL de la API:
   ```
   VITE_API_BASE_URL=http://localhost:5252/api
   ```
4. Ejecuta la app:
   ```sh
   npm run dev
   ```
   La app estará en `http://localhost:5173` (por defecto).

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
- `POST /api/contacts/search-advanced` — Búsqueda avanzada de contactos (múltiples campos y perfiles)
- `POST /api/contacts/export` — Exporta contactos filtrados (simple o avanzado) como CSV
- `GET /api/contacts/{id}` — Obtener detalles de un contacto por ID
- `PUT /api/contacts/{id}` — Editar contacto (según permisos)
- `DELETE /api/contacts/{id}` — Eliminar contacto (según permisos)

---

## Funcionalidades destacadas

- Búsqueda simple y avanzada de contactos (por nombre, email, empresa, perfiles, etc.)
- Filtros avanzados y selector múltiple de perfiles
- Exportación de contactos a CSV (compatible con ambos modos de búsqueda)
- Historial reutilizable de filtros avanzados
- UI moderna, responsiva y accesible
- Gestión de avatar de usuario
- Roles y permisos

---

## Flujo de usuario e integración

1. Login en frontend → obtención de token y refreshToken
2. Acceso a funcionalidades protegidas (búsqueda, edición, gestión de usuario/avatar)
3. Uso de endpoints según permisos y roles
4. Gestión de sesión y refresh token automática
5. Feedback visual y protección de rutas en frontend

---

## Variables de entorno y configuración

- **Frontend:** `.env` con:
  ```
  VITE_API_BASE_URL=http://localhost:5252/api
  ```
- **Backend:** `appsettings.json` con:
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

## Seed de Datos Iniciales (Backend)

El backend puede poblar automáticamente la base de datos con datos de prueba realistas tras las migraciones, ideal para pruebas y desarrollo rápido.

- Controlado por el parámetro `SeedInitialData` en `backend/SearchServiceEngine/appsettings.json`.
- Si está en `true`, al arrancar el backend se insertan:
  - 2 usuarios (Admin y User)
  - 6 perfiles (Cliente, Proveedor, Socio, Empleado, Prospecto, VIP)
  - 4 empresas (InovaTech Solutions, AgroGlobal S.A., BlueWave Consulting, Logística Express SL)
  - 1000 contactos con datos variados, perfiles y empresas asignados aleatoriamente
- Para desactivar el seed, pon `SeedInitialData` en `false`.

Consulta el README del backend para más detalles y ejemplos de configuración.

---

## Seguridad

- Autenticación JWT (Bearer Token)
- Refresh token seguro y revocable
- Roles y claims en backend y frontend
- Protección de rutas privadas y validación de roles en la UI
- Almacenamiento seguro de tokens (solo refresh token en localStorage)

---

## Testing y buenas prácticas

- Pruebas unitarias en backend con xUnit y Moq
- Pruebas de endpoints de autenticación, usuarios y contactos
- Validaciones de entrada con FluentValidation
- Código modular, documentado y alineado con OpenAPI/Scalar

---

## Cambios recientes y mejoras

- Búsqueda avanzada y exportación CSV robusta en frontend y backend
- Historial de filtros avanzados reutilizable y UI moderna
- Corrección de limpieza de filtros (perfiles) en búsqueda avanzada
- Flujo de autenticación y perfil robusto y sincronizado
- Avatar y datos de usuario integrados y protegidos, con placeholder y favicon personalizados "AI"
- Sincronización total de tokens y usuario en frontend/backend
- Mejoras de UX y feedback visual en login/logout/perfil
- Sidebar y página de perfil modernizados, con avatar y datos de usuario consistentes
- Limpieza de código y documentación alineada con la implementación final

---

## Tareas y TODOs

Consulta los archivos [backend/SearchServiceEngine/TODO.md](backend/SearchServiceEngine/TODO.md) y [frontend/TODO.md](frontend/TODO.md) para ver el estado detallado de tareas, mejoras y próximos pasos en cada parte del proyecto.

---

## Documentación específica

- [Documentación Backend (SearchServiceEngine)](backend/SearchServiceEngine/README.md)
- [Documentación Frontend](frontend/README.md)

---

## Créditos y agradecimientos

Desarrollado por el equipo AIWeek. Basado en mejores prácticas de arquitectura, seguridad y experiencia de usuario para aplicaciones web modernas.
