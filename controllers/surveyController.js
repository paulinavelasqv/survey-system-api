const Survey = require("../models/survey");

const createSurvey = async(req, res) =>{

    try {
        // Obtenemos parametros del body
        const params = req.body;
        const userId = req.user.id;

        // Validamos que los datos que nos envia el usuario son validos
        if(!params.title || !params.options || !Array.isArray(params.options) || params.options.length < 2){
            return res.status(400).json({ message: 'Se requiere un título y al menos 2 opciones' });
        }

        // Damos formato al campo options enviado por parametros para guardarlo posteriormente en el formato que require la BD
        const formattedOptions = params.options.map(optionText => ({
            text: optionText,
            votes: 0
        }));

        // Creamos objeto nuevo de Survey
        const newSurvey = new Survey({
            title: params.title,
            options: formattedOptions,
            createdBy: userId
        });

        await newSurvey.save();

        return res.status(200).json({
            status: "success",
            message: "Encuesta creada correctamente.",
            survey: newSurvey
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error del servidor."
        });
    }
}

const getAllSurveys = async (req, res) => {

    try {
        const surveys = await Survey.find().populate('createdBy', 'username').sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            message: "Listar todas las encuestas.",
            surveys
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener encuestas."
        });
    }
}

const getSurvey = async (req, res) => {

    try {
        // Obtener id por parametros
        const surveyId = req.params.id;

        const survey = await Survey.findById(surveyId).populate('createdBy', 'username').sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            message: "Listar una encuesta.",
            survey
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener encuesta."
        });
    }
}

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurvey
}