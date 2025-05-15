const {Schema, model} = require("mongoose");

const SurveySchema = Schema({
    title: {
        type: String,
        required: true
    },
    options: [ { text: String, votes: Number } ],
    createdBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = model("Survey", SurveySchema, "surveys");
