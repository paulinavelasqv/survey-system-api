const mongoose = require("mongoose");

const connection = async(req, res) => {
    try {
        await mongoose.connect("mongodb://localhost:27017/survey_system");
        console.log("Conectado correctamente a la base de datos survey_system");

    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = connection;