const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Definir rutas de usuario
router.post("/register", userController.register);
router.post("/login", userController.login);

// Exportar router
module.exports = router;