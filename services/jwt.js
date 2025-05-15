// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta
const secret = "CLAVE_SECRETA_del_proyecto_SURVEY_system_987337";

// Crear una funcion para generar tokens
const createToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    // Devolver jwt codificado
    return jwt.encode(payload, secret);
}


module.exports = {
    secret,
    createToken
}