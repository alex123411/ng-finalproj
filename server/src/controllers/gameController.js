const express = require('express');
const router = express.Router();
const {badRequestError, eternalServerError} = require('../errors')


const {
    addGame,
    getAllGames,
} = require('../services/gameService');

router.get('/all', async (req, res) => {
    try {
        const games = await getAllGames();
        res.status(200).json({games});
    } catch (err) {
        if (err.status == 400) {
            res.status(400).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
        
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            name,
            price,
            ganre,
            photo,
        } = req.body;
        
        await addGame({name, price, ganre, photo});

        res.json({message: 'Game added successfully!'});

    } catch (err) {
        if (err.status == 400) {
            res.status(400).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
        
    }
});



module.exports = {
    gameRouter: router
}