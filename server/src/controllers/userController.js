const express = require('express');
const router = express.Router();

const {
    getProfileInfo,
    addGameToUserLibrary,
    findUsersByNickname,
    sendFriendRequest,
    removeFriend,
    acceptFriend,
    rejectFriend,
} = require('../services/userService');

router.delete('/', async (req, res) => {
    try{
        const { userId } = req.user;

        await deleteProfile(userId);

        res.status(200).json({message: ("Success")});
    } catch (err){
        res.status(500).json({message: err.message});
    }
    
});

router.get('/', async (req, res) => {
    try{
        const { userId } = req.user;

        const user = await getProfileInfo(userId);
        if (!user) {
            res.status(400).json({message: "no info about this user"});
        }
        else{
            res.json({user});
        }
        
    } catch (err){
        res.status(err.status).json({message: err.message});
    }
});

router.post('/addgame', async (req, res) => {
    try{
        const { userId } = req.user;
        const {
            name,
            price,
            ganre,
            photo,
        } = req.body;
        const game = {name,price,ganre,photo}
        const user = await addGameToUserLibrary(userId, game);

        res.json({user});      
        
    } catch (err){
        res.status(err.status).json({message : err.message});
    }
    
});

router.post('/find', async (req, res) => {
    try{
        const {nickname} = req.body;
        const users = await findUsersByNickname(nickname);
        if (!users) {
            res.status(400).json({message: "no info about this user"});
        }
        else{
            res.json({users});
        }
        
    } catch (err){
        res.status(500).json({message: err.message});
    }
    
});


router.post('/sendfriendrequest', async (req, res) => {
    try{
        const { userId } = req.user;
        const {nickname} = req.body;
        const result = await sendFriendRequest(userId, nickname);
        
        res.json({result});
    } catch (err){
        res.status(err.status).json({message: err.message});
    }
    
});

router.post('/removefriend', async (req, res) => {
    try{
        const { userId } = req.user;
        const { nickname } = req.body;
        const result = await removeFriend(userId, nickname);
        
        res.json({result});
    } catch (err){
        res.status(err.status).json({message: err.message});
    }
    
});

router.post('/acceptfriend', async (req, res) => {
    try{
        const { userId } = req.user;
        const {nickname} = req.body;
        const result = await acceptFriend(userId, nickname);
        
        res.json({result});
    } catch (err){
        res.status(err.status).json({message: err.message});
    }
    
});

router.post('/rejectfriend', async (req, res) => {
    try{
        const { userId } = req.user;
        const {nickname} = req.body;
        const result = await rejectFriend(userId, nickname);
        
        res.json({result});
    } catch (err){
        res.status(err.status).json({message: err.message});
    }
    
});

module.exports = {
    userRouter: router
}