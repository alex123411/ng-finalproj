const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    price: {
        type: Number,
    },

    ganre: {
        type: String,
    },

    photo: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Game = mongoose.model('Game', {
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    ganre: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});



module.exports = { Game, GameSchema };
