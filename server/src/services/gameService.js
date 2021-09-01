const {Game} = require('../models/gameModel');

const addGame = async ({name, price, ganre, photo}) => {
    const game = new Game({
        name,
        price,
        ganre,
        photo,
    });
    console.log(name)
    await game.save();
}

const getAllGames = async() =>{
    const games = await Game.find({});
    return games;
}

module.exports = {
    addGame,
    getAllGames,
};