# Lista de tareas para el frontend

Este archivo contiene una lista detallada y actualizada de tareas y funcionalidades pendientes para el desarrollo del frontend, alineadas con el backend y las mejores prácticas.

## 1. Estructura base y configuración
- [x] Inicializar el proyecto en React con Vite
- [x] Configurar estructura de carpetas y rutas
- [ ] Crear componentes base (Layout, Header, Footer, Loader, etc.)
- [x] Configurar React Router con páginas iniciales (Home, Login, Dashboard, NotFound)
- [ ] Implementar protección de rutas privadas que requieren login
- [ ] Configurar variables de entorno para endpoints y claves

## 2. Autenticación y seguridad
- [ ] Implementar formulario de login
- [ ] Consumir endpoint de login del backend
- [ ] Almacenar tokens (access y refresh) de forma segura (memoria/contexto, nunca localStorage para access token)
- [ ] Implementar lógica de refresh token automático (interceptor de Axios)
- [ ] Implementar logout y limpieza de tokens
- [ ] Proteger rutas privadas (middleware/guard)
- [ ] Mostrar mensajes de error claros en login/logout/refresh
- [ ] Sincronizar expiración de sesión con backend

## 3. Consumo de API y lógica de negocio
- [ ] Configurar Axios con interceptores para Authorization y manejo de errores global
- [ ] Crear servicios para consumo de endpoints (contacts, users, auth)
- [ ] Implementar CRUD de contactos:
    - [ ] Listar contactos (GET /contacts, con filtros y paginación)
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
- [ ] Configurar contexto global (React Context o Zustand/Redux) para usuario y sesión
- [ ] Sincronizar estado de autenticación en toda la app
- [ ] Persistir sesión de usuario de forma segura (refresh token)
- [ ] Actualizar estado global tras login/logout/refresh

## 5. UI/UX y validaciones
- [ ] Añadir estilos y diseño responsivo usando Tailwind CSS
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

Este archivo se irá actualizando conforme se definan y completen nuevas tareas.
