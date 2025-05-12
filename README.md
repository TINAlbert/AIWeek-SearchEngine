# Proyecto AIWeek

Este repositorio contiene el desarrollo y documentación del proyecto AIWeek.

## Descripción

Este proyecto está orientado a probar y documentar las capacidades de la IA en el desarrollo colaborativo de software.

## Estructura

- `.github/`: Instrucciones y configuraciones para la colaboración.
- `README.md`: Documentación general del proyecto.
- `backend/`: Proyecto de backend desarrollado en .NET Core (Web API). Incluye:
  - Modelos organizados en `backend/Models/`
  - Endpoints protegidos con autenticación JWT y roles
  - Ejemplo de endpoints: `/login`, `/weatherforecast`
- `frontend/`: Proyecto de frontend (próximamente en React).

## Backend

El backend está implementado como un servicio Web API en .NET Core. Para ejecutarlo localmente:

```powershell
dotnet run --project backend
```

Por defecto, el endpoint de ejemplo `/weatherforecast` estará disponible en el puerto configurado (por ejemplo, http://localhost:5252/weatherforecast).

El endpoint `/login` permite autenticación y devuelve un JWT válido para los usuarios definidos en memoria.

## Instrucciones

Consulta el archivo `.github/.instructions.md` para conocer las reglas de trabajo y colaboración.

---

Este archivo se irá actualizando conforme avance el proyecto y se definan nuevos objetivos o funcionalidades.
