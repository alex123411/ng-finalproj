const mongoose = require('mongoose');
const  {GameSchema}  = require('./gameModel')

const SmallUser = new mongoose.Schema({
    nickname: String,
    status: {
        type: String,
        enum: ['accepted', 'pending', 'declined'],
        default: 'pending',
    },
}
)

const User = mongoose.model('User', {

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    nickname: {
        type: String,
        required: true,
        unique: true,
    },

    profilePhoto: {
        type: String,
        default: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/25/25d2cba5dc2986255aeebfd21c1588446e71aeba_full.jpg',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    friendsList: {
        type: [SmallUser],
        default: [],
    },

    gamesList: {
        type: [GameSchema],
        default: [],
    }


});



module.exports = { User };
