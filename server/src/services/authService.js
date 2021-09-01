const jwt = require('jsonwebtoken');
const {badRequestError} = require('../errors')

const {User} = require('../models/userModel');

const registration = async ({nickname, email, password}) => {
    if(await User.findOne({email})){throw new badRequestError('user with such email alredy exists!');}
    if(await User.findOne({nickname: nickname})){throw new badRequestError('user with such nickname alredy exists!');}

    const user = new User({
        email,
        password,
        nickname,
    });
    await user.save();
}

const logIn = async ({email, password}) => {
    const user = await User.findOne({email});

    if (!user || !(password == user.password)) {
        throw new badRequestError('wrong email or password');
    }

    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, 'secret');
    return token;
}

const forgotPassword = async ({email}) => {
    const user = await User.findOne({email});

    if(!user)
    {
        throw new badRequestError('Can`t find profile with such email');
    }
}
  
module.exports = {
    registration,
    logIn,
    forgotPassword
};