const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

console.log("API NODEJS SURVEY APP");

dotenv.config();

// Conexión a la BD
connection();

// Crear app y servidor HTTP
const app = express();
const server = http.createServer(app);

// Inicializar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Guardar instancia de io para usar en controladores
app.set("io", io);

// Escuchar eventos de conexión
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado vía Socket.IO:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const UserRoutes = require("./routes/userRoute");
const SurveyRoutes = require("./routes/surveyRoute");
const VoteRoutes = require("./routes/voteRoute");

app.use("/api/auth", UserRoutes);
app.use("/api/surveys", SurveyRoutes);
app.use("/api", VoteRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});