const {Schema, model} = require("mongoose");

const VoteSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "user"
    },
    survey: {
        type: Schema.ObjectId,
        ref: "survey"
    },
    optionIndex: {
        type: Number,
        required: true
    }
});

VoteSchema.index({ user: 1, survey: 1 }, { unique: true }); // Evita votos duplicados

module.exports = model("Vote", VoteSchema, "votes");