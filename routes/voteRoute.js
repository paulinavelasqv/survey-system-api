const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth");
const voteController = require("../controllers/voteController");

// Rutas
router.post("/surveys/:id/vote", check.auth, voteController.voteOnSurvey);

// Exportar router
module.exports = router;