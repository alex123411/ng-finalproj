const { User } = require('../models/userModel');
const { badRequestError } = require('../errors')

const getProfileInfo = async (userId) => {
  try {
    const userInfo = await User.findById(userId);
    const user = {
      "_id": userInfo._id,
      "email": userInfo.email,
      "nickname": userInfo.nickname,
      "createdDate": userInfo.createdAt,
      "friendList": userInfo.friendsList,
      "gamesList": userInfo.gamesList,
      "profilePhoto": userInfo.profilePhoto,
    };
    return user;
  } catch (err) {
    return 0;
  }
}

const findUsersByNickname = async (nickname) => {
  try {
    let usersToReturn = []
    const users = await User.find({});
    users.forEach(user => {
      if (user.nickname.includes(nickname)) {
        usersToReturn.push(user.nickname);
      }
    });
    return usersToReturn;
  } catch (err) {
    console.log(err)
  }
}

const sendFriendRequest = async (userId, nickname) => {
  try {
    const userWhoSends = await User.findById(userId);
    const userToSend = await User.findOne({ "nickname": nickname });
    userToSend.friendsList.forEach(element => {
      if (element.nickname == userWhoSends.nickname) {
        throw new badRequestError('this user has already recieved your request or he is in your friend list!')
      }
    });
    userToSend.friendsList.push({ 'nickname': userWhoSends.nickname })
    userToSend.save()
    return 'request SENT!'
  } catch (err) {
    throw new badRequestError(err.message)
  }
}

const deleteProfile = async (userId) => {
  await User.remove({ _id: userId });
}


const updateUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user || oldPassword != user.password) {
    return 0;
  }


  await User.findByIdAndUpdate(userId, {
    $set: {
      password: newPassword,
    }
  });
};

const addGameToUserLibrary = async (userId, game) => {
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new badRequestError('there is no such user');
  }
  user.gamesList.forEach(element => {
    if (element.name == game.name) { throw new badRequestError('this game is already in your library!') }
  });
  user.gamesList.push({ name: game.name, price: game.price, ganre: game.ganre, photo: game.photo, });

  await user.save();

  return user;
};

const removeFriend = async (userId, nickname) => {
  try {
    let i = 0;
    const userWhoRemoves = await User.findById(userId);
    const userToRemove = await User.findOne({ "nickname": nickname });
    userWhoRemoves.friendsList.forEach(element => {
      if (element.nickname == userToRemove.nickname) {
        userWhoRemoves.friendsList.splice(i,1)
        i++;
      }
    });
    i = 0
    userToRemove.friendsList.forEach(element => {
      if (element.nickname == userWhoRemoves.nickname) {
        userToRemove.friendsList.splice(i,1)
        i++;
      }
    });
    userToRemove.save()
    userWhoRemoves.save()
    return 'deleted!'
  } catch (err) {
    throw new badRequestError(err.message)
  }
}
const acceptFriend = async (userId, nickname) => {
  try {
    let i = 0;
    const userWhoAccepts = await User.findById(userId);
    const userToBeAccepted = await User.findOne({ "nickname": nickname });
    userWhoAccepts.friendsList.forEach(element => {
      if (element.nickname == userToBeAccepted.nickname) {
        userWhoAccepts.friendsList[i].status = 'accepted'
      }
      i++;
    });
    userToBeAccepted.friendsList.push({ 'nickname': userWhoAccepts.nickname , 'status': 'accepted'})
    userWhoAccepts.save()
    userToBeAccepted.save()
    return 'request SENT!'
  } catch (err) {
    throw new badRequestError(err.message)
  }
}
const rejectFriend = async (userId, nickname) => {
  try {
    let i = 0;
    const userWhoRejects = await User.findById(userId);
    userWhoRejects.friendsList.forEach(element => {
      if (element.nickname == nickname) {
        userWhoRemoves.friendsList.splice(1,i)
        i++;
      }
    });
    userWhoRejects.save()
    return 'rejected!'
  } catch (err) {
    throw new badRequestError(err.message)
  }
}

module.exports = {
  getProfileInfo,
  deleteProfile,
  updateUserPassword,
  addGameToUserLibrary,
  findUsersByNickname,
  sendFriendRequest,
  removeFriend,
  acceptFriend,
  rejectFriend,
};