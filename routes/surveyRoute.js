const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/surveyController");
const check = require("../middlewares/auth");

// Definir rutas
router.post("/", check.auth, surveyController.createSurvey);
router.get("/", check.auth, surveyController.getAllSurveys);
router.get("/:id", check.auth, surveyController.getSurvey);

// Exportar router
module.exports = router;