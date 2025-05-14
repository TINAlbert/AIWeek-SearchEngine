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

## 2025-05-12 (continuación)

- Se implementó un endpoint `/login` en el backend que valida usuario y contraseña y devuelve un JWT si las credenciales son correctas.
- Se configuró correctamente la clave JWT para cumplir con los requisitos de seguridad del algoritmo HS256.
- Se realizó una prueba automática del endpoint `/login` mediante PowerShell y HTTP, obteniendo un token JWT válido al enviar las credenciales:
  - username: `admin`
  - password: `admin123`
- Se refactorizó el backend para organizar los endpoints en controladores (`UsersController` y `AuthController`).
- El endpoint `POST /api/auth/login` permite autenticación y devuelve un JWT válido.
- El endpoint `GET /api/users`, protegido por rol Admin, responde correctamente cuando se usa el token obtenido en el login.
- Se realizaron pruebas automáticas exitosas de ambos endpoints usando PowerShell.

## Registro de actividad reciente

- Se renombró y reorganizó el proyecto backend a SearchServiceEngine.
- Se actualizaron todos los namespaces y referencias internas a SearchServiceEngine.
- Se restauraron e instalaron los paquetes NuGet necesarios (Entity Framework Core, Sqlite, JWT).
- Se verificó la compilación y ejecución correcta del backend tras la migración.

## 2025-05-12 (continuación)

- Se refactorizó el endpoint de login en `AuthController` para que reciba un DTO `LoginRequest` (solo usuario y contraseña) en vez del modelo completo de usuario.
- Se creó la clase `LoginRequest` en `Models`.
- Se actualizaron los tests unitarios de login para usar el nuevo DTO.
- Se verificó que los tests unitarios pasan correctamente tras el cambio.

## 2025-05-13

- Se reorganizó el backend siguiendo buenas prácticas: separación en capas Controllers, Services, Repositories, Models y DTOs.
- Se implementó la entidad Contact y sus DTOs, así como la capa de servicios y repositorios para contactos.
- Se integró AutoMapper para el mapeo entre entidades y DTOs.
- Se integró FluentValidation para la validación automática de los DTOs de contacto.
- Se crearon los endpoints CRUD completos para contactos, con soporte de filtros y paginación.
- Se añadieron datos de ejemplo (seed) para la entidad Contact y se aplicaron las migraciones correspondientes.
- Se verificó la correcta compilación y funcionamiento de la API tras los cambios estructurales.

## 2025-05-13

- Se documentaron todos los endpoints del ContactsController con comentarios XML para mejorar la generación de documentación automática (Swagger/OpenAPI).
- Se documentaron los DTOs de contacto (ContactDto, ContactCreateDto, ContactUpdateDto) con comentarios XML en sus clases y propiedades.
- Se explicó el uso y funcionamiento de ContactUpdateDtoValidator: se utiliza automáticamente en el endpoint PUT /contacts/{id} para validar los datos de actualización de contactos mediante FluentValidation.

## 2025-05-13

- Implementada la gestión completa de refresh tokens: creación, almacenamiento seguro, expiración, revocación y eliminación tras login.
- Añadidos endpoints POST /auth/refresh y POST /auth/logout.
- Ahora, tras un login correcto, se eliminan todos los refresh tokens activos previos del usuario.
- Documentados los endpoints de autenticación y su flujo en AuthController.
- Actualizada la documentación de endpoints y DTOs de contactos.

## 2025-05-13

- Implementado endpoint POST /api/users para registro de usuarios (solo Admin), con validación avanzada y DTO documentado.
- Añadida documentación XML a endpoints, DTOs y validadores de usuario.
- Corregidos los warnings de posibles valores nulos en claims y configuración JWT.
- El backend compila correctamente y está listo para pruebas.

## 2025-05-13

- Integrada la autenticación Bearer JWT en la documentación interactiva Scalar UI del backend.
- Se aclara que Scalar UI no muestra botón "Authorize"; el token debe añadirse manualmente en los headers al probar endpoints protegidos.
- El backend compila y funciona correctamente con la configuración actual de seguridad y documentación.
- Listo para commit final de la configuración de Scalar/OpenAPI y autenticación JWT.

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

# Resumen de cambios recientes (13/05/2025)

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

Este archivo debe ser actualizado de forma continua para reflejar las acciones y decisiones tomadas mediante la interacción con la IA.
