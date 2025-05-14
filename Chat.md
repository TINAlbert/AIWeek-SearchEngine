# Registro de Actividad con IA

Este archivo resume las operaciones realizadas mediante el chat y el agente de IA en el proyecto AIWeek.

---

## 2025-05-12

- Creación del archivo `.instructions.md` con reglas básicas de trabajo.
- Inicialización del repositorio git y creación del archivo `.gitignore` adaptado para proyectos React y .NET Core.
- Estructuración de carpetas `frontend` y `backend`.
- Inicialización del backend como Web API en .NET Core y verificación de funcionamiento.
- Actualización del `README.md` para reflejar la estructura y características del backend.
- Creación de archivos `TODO.md` para backend y frontend con listas de tareas iniciales.
- Limpieza y reinicio de la estructura del frontend para iniciar con Vite y React.
- Inicialización del frontend con Vite (React + TypeScript + SWC) y verificación de funcionamiento.
- Actualización de las instrucciones para especificar el entorno Windows y la necesidad de mantener actualizado este archivo `Chat.md`.

### (continuación)

- Se implementó un endpoint `/login` en el backend que valida usuario y contraseña y devuelve un JWT si las credenciales son correctas.
- Se configuró correctamente la clave JWT para cumplir con los requisitos de seguridad del algoritmo HS256.
- Se realizó una prueba automática del endpoint `/login` mediante PowerShell y HTTP, obteniendo un token JWT válido al enviar las credenciales:
  - username: `admin`
  - password: `admin123`
- Se refactorizó el backend para organizar los endpoints en controladores (`UsersController` y `AuthController`).
- El endpoint `POST /api/auth/login` permite autenticación y devuelve un JWT válido.
- El endpoint `GET /api/users`, protegido por rol Admin, responde correctamente cuando se usa el token obtenido en el login.
- Se realizaron pruebas automáticas exitosas de ambos endpoints usando PowerShell.

- Se renombró y reorganizó el proyecto backend a SearchServiceEngine.
- Se actualizaron todos los namespaces y referencias internas a SearchServiceEngine.
- Se restauraron e instalaron los paquetes NuGet necesarios (Entity Framework Core, Sqlite, JWT).
- Se verificó la compilación y ejecución correcta del backend tras la migración.

- Se refactorizó el endpoint de login en `AuthController` para que reciba un DTO `LoginRequest` (solo usuario y contraseña) en vez del modelo completo de usuario.
- Se creó la clase `LoginRequest` en `Models`.
- Se actualizaron los tests unitarios de login para usar el nuevo DTO.
- Se verificó que los tests unitarios pasan correctamente tras el cambio.

---

## 2025-05-13

- Se reorganizó el backend siguiendo buenas prácticas: separación en capas Controllers, Services, Repositories, Models y DTOs.
- Se implementó la entidad Contact y sus DTOs, así como la capa de servicios y repositorios para contactos.
- Se integró AutoMapper para el mapeo entre entidades y DTOs.
- Se integró FluentValidation para la validación automática de los DTOs de contacto.
- Se crearon los endpoints CRUD completos para contactos, con soporte de filtros y paginación.
- Se añadieron datos de ejemplo (seed) para la entidad Contact y se aplicaron las migraciones correspondientes.
- Se verificó la correcta compilación y funcionamiento de la API tras los cambios estructurales.

- Se documentaron todos los endpoints del ContactsController con comentarios XML para mejorar la generación de documentación automática (Swagger/OpenAPI).
- Se documentaron los DTOs de contacto (ContactDto, ContactCreateDto, ContactUpdateDto) con comentarios XML en sus clases y propiedades.
- Se explicó el uso y funcionamiento de ContactUpdateDtoValidator: se utiliza automáticamente en el endpoint PUT /contacts/{id} para validar los datos de actualización de contactos mediante FluentValidation.

- Implementada la gestión completa de refresh tokens: creación, almacenamiento seguro, expiración, revocación y eliminación tras login.
- Añadidos endpoints POST /auth/refresh y POST /auth/logout.
- Ahora, tras un login correcto, se eliminan todos los refresh tokens activos previos del usuario.
- Documentados los endpoints de autenticación y su flujo en AuthController.
- Actualizada la documentación de endpoints y DTOs de contactos.

- Implementado endpoint POST /api/users para registro de usuarios (solo Admin), con validación avanzada y DTO documentado.
- Añadida documentación XML a endpoints, DTOs y validadores de usuario.
- Corregidos los warnings de posibles valores nulos en claims y configuración JWT.
- El backend compila correctamente y está listo para pruebas.

- Integrada la autenticación Bearer JWT en la documentación interactiva Scalar UI del backend.
- Se aclara que Scalar UI no muestra botón "Authorize"; el token debe añadirse manualmente en los headers al probar endpoints protegidos.
- El backend compila y funciona correctamente con la configuración actual de seguridad y documentación.
- Listo para commit final de la configuración de Scalar/OpenAPI y autenticación JWT.

- Refactor y robustecimiento de controladores y servicios principales (Contacts, Users, Auth) en el backend.
- Corrección y ampliación de tests unitarios para todos los controladores y servicios principales.
- Eliminación de advertencias de nulabilidad en los tests.
- Todos los tests relevantes pasan correctamente.
- Actualización de TODO.md para reflejar el estado real del proyecto tras el commit.

Próximos pasos sugeridos:
- Añadir pruebas de integración.
- Configurar CI/CD, logs y CORS.
- Mejorar documentación de uso en backend.http si es necesario.

---

## 2025-05-14

- Instalado y configurado Tailwind CSS en el frontend con Vite, asegurando compatibilidad y buenas prácticas.
- Implementado formulario de login robusto usando React Hook Form y Yup para validación, con diseño en Tailwind.
- Creado servicio de autenticación con Axios para consumir el endpoint de login del backend.
- Añadido contexto global de autenticación (AuthContext) para almacenar tokens y usuario en memoria.
- Implementada lógica de refresh token automático mediante interceptor de Axios y endpoint /auth/refresh.
- Añadido logout y limpieza de tokens en el contexto global.
- Protegidas rutas privadas con componente PrivateRoute y React Router DOM.
- Añadido sistema global de toasts de error con react-hot-toast, mostrando mensajes claros en login, refresh y logout.
- Sincronizada la expiración de sesión con el backend: si el refresh token falla, se hace logout, se muestra un toast y se redirige a /login.
- Actualizado TODO.md marcando como completados todos los puntos de autenticación y protección de rutas privadas.
- Realizado commit de todos los cambios relevantes en frontend.
- Refactor completo del flujo de autenticación en el frontend:
  - Eliminadas todas las referencias a `user` y `accessToken` en contexto, servicios y rutas privadas.
  - El servicio de login y refresh ahora solo devuelve `{ token, refreshToken }`.
  - El contexto de autenticación y las rutas privadas (`PrivateRoute`) dependen únicamente de la existencia de `accessToken`.
  - Ajustados los tipos y servicios para reflejar la respuesta real del backend.
  - Actualizado el TODO.md del frontend para marcar como completadas las tareas de autenticación y protección de rutas.
  - Actualizado el README del frontend y la raíz para reflejar la nueva estructura de autenticación (`token` y `refreshToken`).
- Realizados commits por separado para frontend (refactor y docs) y backend (documentación).
- Se siguieron las reglas del archivo `.github/.instructions.md` para mensajes de commit y documentación.

- Implementado menú lateral (Sidebar) responsive:
  - Sidebar colapsable en escritorio, con logo/botón centrado y animación.
  - Navbar superior y drawer lateral en móvil.
  - Integración en todas las páginas privadas mediante Layout.
  - El logo "AIWeek" funciona como botón para expandir/colapsar, mostrando solo "AI" en modo colapsado.
- Actualizado TODO.md para reflejar la tarea completada y anotación sobre estilos generales pendientes.

- Se configuró Axios con interceptores para Authorization y manejo global de errores (toasts) en el frontend.
- Se creó el archivo de tipos `src/types/contact.ts` para la entidad Contact y operaciones relacionadas.
- Se implementó el servicio `contactsService` en `src/services/contacts.ts` para consumir los endpoints de contactos (listado, detalle, crear, editar, eliminar), usando import type para cumplir con `verbatimModuleSyntax`.
- Se creó la página `ContactsPage` que muestra el listado de contactos en una tabla, con paginación y feedback de carga.
- Se integró la ruta `/contacts` como ruta privada en el sistema de rutas, accesible solo para usuarios autenticados.
- El listado de contactos ya puede probarse desde la navegación de la app.
- Actualizado `TODO.md` para reflejar el avance en el punto 3 (consumo de API y UI de contactos).

### (continuación)

- Adaptado el frontend para consumir y mostrar la nueva estructura de paginación enriquecida del backend:
  - Actualizados los tipos en `src/types/contact.ts` para reflejar los nuevos campos (`totalPages`, `hasNextPage`, `hasPreviousPage`).
  - Modificado el servicio `contactsService` para usar el nuevo tipo de respuesta.
  - Refactorizada la página `ContactsPage` para mostrar correctamente la información de paginación enriquecida y mejorar la experiencia de usuario.
  - La UI ahora muestra el total de contactos, la página actual, el total de páginas y los botones de navegación usan los flags `hasNextPage` y `hasPreviousPage`.
- Verificado que no hay errores de compilación en los archivos modificados.
- Listo para realizar commits separados en backend y frontend por los cambios de paginación y adaptación de la UI.

---

Este archivo debe ser actualizado de forma continua para reflejar las acciones y decisiones tomadas mediante la interacción con la IA.
