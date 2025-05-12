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

---

Este archivo debe ser actualizado de forma continua para reflejar las acciones y decisiones tomadas mediante la interacción con la IA.
