const Survey = require("../models/survey");
const Vote = require("../models/vote");

const voteOnSurvey = async (req, res) =>{

    try {

        const userId = req.user.id;
        const surveyId = req.params.id;
        const {optionIndex} = req.body;

        // Validar existencia de encuesta
        const survey = await Survey.findById(surveyId);
        if(!survey){
            return res.status(404).json({
                status: "error",
                message: "Encuesta no encontrada."
            });
        }

        // Validar opcion
        if(typeof optionIndex !== 'number' || optionIndex < 0 || optionIndex >= survey.options.length){
            return res.status(400).json({
                status: "error",
                message: "Indice de opcion invalido."
            });
        }

        // Verificar si el usuario ya voto
        const existingVote = await Vote.findOne({user: userId, survey: surveyId});
        if(existingVote){
            return res.status(400).json({
                status: "error",
                message: "Ya has votado en esta encuesta."
            });
        }

        // Registrar voto
        survey.options[optionIndex].votes += 1;
        await survey.save();

        const vote = new Vote({
            user: userId,
            survey: surveyId,
            optionIndex
        });
        await vote.save();

        // Emitir resultados actualizados por Socket.IO
        const io = req.app.get('io'); // accedemos a la instancia de Socket.IO
        io.emit(`surveyUpdated:${surveyId}`, survey); // evento único por encuesta

        return res.status(200).json({
            status: "success",
            message: "Voto registrado correctamente.",
            survey
        });
        
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Error del servidor' });
    }
}

module.exports = {
    voteOnSurvey
}