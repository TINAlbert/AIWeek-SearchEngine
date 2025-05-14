# Lista de tareas para el frontend

Este archivo contiene una lista detallada y actualizada de tareas y funcionalidades pendientes para el desarrollo del frontend, alineadas con el backend y las mejores prácticas.

## 1. Estructura base y configuración
- [x] Inicializar el proyecto en React con Vite
- [x] Configurar estructura de carpetas y rutas
- [x] Crear menú lateral responsive (Sidebar) con colapsado en escritorio y navbar en móvil
- [x] Configurar React Router con páginas iniciales (Home, Login, Dashboard, NotFound)
- [x] Implementar protección de rutas privadas que requieren login
- [x] Configurar variables de entorno para endpoints y claves

## 2. Autenticación y seguridad
- [x] Implementar formulario de login
- [x] Consumir endpoint de login del backend
- [x] Almacenar tokens (token y refreshToken) de forma segura (memoria/contexto, nunca localStorage para access token)
- [x] Implementar lógica de refresh token automático (interceptor de Axios)
- [x] Implementar logout y limpieza de tokens
- [x] Proteger rutas privadas (middleware/guard)
- [x] Mostrar mensajes de error claros en login/logout/refresh
- [x] Sincronizar expiración de sesión con backend
- [x] Refactorizar servicios y contexto para eliminar referencias a user y accessToken, usando solo token y refreshToken
- [x] Ajustar PrivateRoute para depender solo de token
- [x] Actualizar tipos y servicios según la respuesta real del backend

## 3. Consumo de API y lógica de negocio
- [x] Configurar Axios con interceptores para Authorization y manejo de errores global
- [x] Crear servicios para consumo de endpoints (contacts, users, auth)
- [x] Página de listado de contactos creada e integrada en rutas privadas (`/contacts`)
- [x] Adaptar frontend para consumir y mostrar la nueva estructura de paginación enriquecida.
- [x] Búsqueda de contactos con debounce automático (sin botón buscar)
- [x] El frontend envía correctamente el parámetro de búsqueda como `filter` (no `search`)
- [ ] Integrar acciones de crear, editar y eliminar contacto en la UI
- [ ] Implementar CRUD de contactos:
    - [x] Listar contactos (GET /contacts, con filtros y paginación)
    - [ ] Ver detalle de contacto (GET /contacts/{id})
    - [ ] Crear contacto (POST /contacts)
    - [ ] Editar contacto (PUT /contacts/{id})
    - [ ] Eliminar contacto (DELETE /contacts/{id})
- [ ] Implementar gestión de usuarios (solo admin):
    - [ ] Listar usuarios
    - [ ] Crear usuario
    - [ ] Editar usuario
    - [ ] Eliminar usuario (opcional)
- [ ] Manejar errores y estados de carga en todos los servicios

## 4. Estado global y gestión de sesión
- [x] Configurar contexto global (React Context o Zustand/Redux) para usuario y sesión
- [x] Sincronizar estado de autenticación en toda la app
- [x] Eliminar referencias a user y accessToken en el contexto y servicios
- [x] Persistir sesión de usuario de forma segura (refresh token)
- [x] Actualizar estado global tras login/logout/refresh

## 5. UI/UX y validaciones
- [ ] Añadir estilos y diseño responsivo usando Tailwind CSS (Sidebar funcional, pendiente estilos generales)
- [ ] Implementar validaciones de formularios (ej: react-hook-form + yup)
- [ ] Mostrar feedback visual de errores y validaciones
- [ ] Añadir loaders/spinners y skeletons en cargas
- [ ] Mejorar accesibilidad (a11y)

## 6. Testing
- [ ] Configurar pruebas unitarias (Jest + React Testing Library)
- [ ] Añadir tests para:
    - [ ] Componentes de UI
    - [ ] Servicios de API
    - [ ] Lógica de autenticación y guards
    - [ ] Formularios y validaciones
- [ ] (Opcional) Pruebas de integración/end-to-end (Cypress/Playwright)

## 7. Documentación y sincronía
- [ ] Mantener actualizado el README con endpoints reales y flujos
- [ ] Documentar estructura de carpetas y convenciones
- [ ] Documentar flujos de autenticación y refresh token
- [ ] Añadir ejemplos de uso de la API y manejo de errores
- [ ] Sincronizar cambios relevantes con el backend y la documentación general

## 8. DevOps y despliegue
- [ ] Configurar scripts de build y preview
- [ ] Configurar despliegue (Vercel, Netlify, Azure, etc.)
- [ ] Configurar CI/CD (opcional)

## Mejora sugerida: Página de listado/búsqueda de contactos
- [x] Mejorar feedback visual de búsqueda:
    - [x] Mostrar loader/spinner o skeleton en el input mientras se busca
    - [ ] Resaltar el texto buscado en los resultados
    - [ ] Botón para limpiar el campo de búsqueda
    - [ ] Mensaje de “sin resultados” más visual
- [ ] Filtros avanzados:
    - [ ] Filtro por estado (Activo/Inactivo)
    - [ ] Filtro por ciudad
    - [ ] Filtro por rango de fechas (creación, actualización)
    - [ ] Selector de campo de búsqueda (nombre, email, documento, etc.)
- [x] Mejoras de paginación:
    - [x] Permitir ir a una página específica
    - [x] Permitir cambiar el tamaño de página (10, 25, 50, 100)
    - [ ] Scroll infinito (opcional)
- [x] Acciones rápidas en la tabla:
    - [x] Botón de ver detalle
    - [ ] Botón de editar
    - [ ] Botón de eliminar
    - [ ] Selección múltiple para eliminar varios contactos
- [x] Accesibilidad y usabilidad:
    - [x] Mejorar enfoque del teclado en el input
    - [x] Soporte para navegación con teclado y lectores de pantalla
- [x] Rendimiento:
    - [x] Cachear resultados recientes de búsqueda
    - [x] Optimizar renderizado de filas
- [ ] Internacionalización:
    - [ ] Preparar la UI para varios idiomas (i18n)
- [x] Vista de tarjetas responsiva y exclusiva en móvil
- [x] Alternancia entre vista de tabla y tarjetas en escritorio

### Cambios recientes
- Búsqueda de contactos ahora es automática (debounce) y no requiere pulsar botón.
- El frontend envía el filtro como `filter` (no `search`) para compatibilidad total con el backend.
- Mejoras de documentación y alineación de endpoints en README.
- Seed de backend con 500 contactos para pruebas de rendimiento y búsqueda.
