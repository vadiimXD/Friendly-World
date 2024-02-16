const mongoose = require("mongoose")

const AnimalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    years: {
        type: Number,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "invalid url"],
    },
    need: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: String,
        required: true,
    }
})

const Animal = mongoose.model("Animal", AnimalSchema)

module.exports = Animal;