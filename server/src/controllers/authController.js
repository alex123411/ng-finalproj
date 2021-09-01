const express = require('express');
const router = express.Router();
var validator = require("email-validator");
const {badRequestError, eternalServerError} = require('../errors')


const {
    registration,
    logIn,
    forgotPassword
} = require('../services/authService');

router.post('/register', async (req, res) => {
    try {
        const {
            nickname,
            email,
            password,
        } = req.body;
        if(!(validator.validate(email))){
            throw new badRequestError('Bad email!')
        }
        await registration({nickname, email, password});

        res.json({message: 'Profile created successfully!'});

    } catch (err) {
        console.log(err.message)
        if (err.status == 400) {
            res.status(400).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
        
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const token = await logIn({email, password});

        res.status(200).json({"token": token});
        
        
    } catch (err) {
        if (err.status == 400) {
            res.status(400).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
});

router.post('/forgot_password', async (req, res) =>{
    try {
        const {
            email
        } = req.body;
        await forgotPassword({email});
        
        res.status(200).json({"message": "New password sent to your email address"});

    } catch (err) {
        if (err.status == 400) {
            res.status(400).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
});

module.exports = {
    authRouter: router
}