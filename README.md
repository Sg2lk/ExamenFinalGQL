# 📦 Examen Final – API de Restaurantes con GraphQL

Este proyecto es una API desarrollada con **GraphQL**, usando **Deno** y **MongoDB**, cuyo objetivo es gestionar una lista de restaurantes. El proyecto fue realizado como parte del examen final de la asignatura de Back End.

---

## 🧠 Tecnologías utilizadas

- **Deno**
- **GraphQL (Apollo Server)**
- **MongoDB (Mongo Atlas)**
- **API Ninjas** para obtener:
  - Validación de número de teléfono
  - Clima actual
  - Zona horaria

---

## 🚀 Funcionalidades de la API

### 🔹 `addRestaurant`
> Crea un nuevo restaurante

**Parámetros:**
- `name`: Nombre del restaurante (String)
- `address`: Dirección (String)
- `city`: Ciudad donde se encuentra (String)
- `phone`: Número de teléfono con prefijo nacional (String)

**Validaciones:**
- El número de teléfono se verifica a través de API Ninjas.
- No se permite registrar más de un restaurante con el mismo número de teléfono.

---

### 🔹 `getRestaurant`
> Devuelve la información de un restaurante por su ID

**Campos devueltos:**
- `id`: ID generado por MongoDB
- `name`: Nombre del restaurante
- `address`: Dirección completa (dirección + ciudad + país)
- `phone`: Número de teléfono
- `weather`: Temperatura actual en la ciudad del restaurante
- `localTime`: Hora local en formato `hh:mm`

> Clima y hora obtenidos mediante las APIs de API Ninjas

---

### 🔹 `getRestaurants`
> Devuelve todos los restaurantes de una ciudad específica

**Parámetro:**
- `city`: Nombre de la ciudad (String)

**Campos devueltos por restaurante:**
- `id`, `name`, `address`, `phone`, `weather`, `localTime`

---

### 🔹 `deleteRestaurant`
> Elimina un restaurante por su ID

**Parámetro:**
- `id`: ID del restaurante (ID)

**Retorna:**
- `true` si se ha eliminado correctamente
- `false` si no se encontró o no se pudo eliminar

---

## 📂 Estructura del proyecto

```
.
├── graphql/
│   ├── resolvers.ts
│   └── schema.ts
├── services/
│   ├── phoneValidation.ts
│   ├── weather.ts
│   └── timezone.ts
├── db/
│   └── client.ts
├── main.ts
├── deps.ts
├── README.md
```

---

## ☁️ Despliegue

- 🔗 [Enlace a la aplicación en Deno Deploy](https://tu-enlace.deno.dev)  
- 📦 [Release del proyecto en GitHub](https://github.com/tuusuario/tu-repo/releases)

> El proyecto está completamente funcional y listo para pruebas o ampliaciones.

---

## 📝 Instrucciones de instalación (local)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
   ```

2. Crea un archivo `.env` con tus claves:
   ```env
   MONGO_URI=...
   API_NINJAS_KEY=...
   ```

3. Ejecuta la API con Deno:
   ```bash
   deno task start
   ```