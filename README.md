# 📊 Survey System API

API RESTful para gestionar encuestas donde los usuarios pueden votar una sola vez y ver resultados en tiempo real.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB con Mongoose
- WebSockets (Socket.IO)
- JWT para autenticación

---

## ⚙️ Funcionalidades principales

- Crear encuestas con múltiples opciones.
- Los usuarios pueden votar solo una vez por encuesta.
- Resultados en tiempo real mediante WebSockets.
- Endpoints para obtener encuestas, votar y ver resultados.
- Autenticación básica.

---

## 📋 Endpoints (ejemplo)

| Método | Ruta                  | Descripción                       |
|--------|-----------------------|----------------------------------|
| GET    | `/api/surveys`        | Listar todas las encuestas       |
| POST   | `/api/surveys`        | Crear nueva encuesta             |
| POST   | `/api/surveys/:id/vote` | Votar en una encuesta          |
| GET    | `/api/surveys/:id`    | Obtener detalles de encuesta     |

---

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/paulinavelasqv/survey-system-api.git
```

2. Instala dependencias:

```bash
npm install
```

3. Configura variables de entorno (`.env`), por ejemplo:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/surveydb
JWT_SECRET=tuSecreto
```

4. Ejecuta la aplicación:

```bash
npm start
```

---

## 🤝 Contribuir

Si quieres ayudar o sugerir mejoras, abre un issue o un pull request.

---

## 📫 Contacto

Paulina Velásquez - [paulinavelasqv@gmail.com](mailto:paulinavelasqv@gmail.com)

GitHub: [https://github.com/paulinavelasqv](https://github.com/paulinavelasqv)

---

¡Gracias por visitar mi proyecto! 😊