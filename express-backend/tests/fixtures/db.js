const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/User")

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "Mike",
  email: "mike@example.com",
  password: "welcometothethunderdome",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  username: "Stan",
  email: "stan@example.com",
  password: "letmein123456",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};


const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase,
    
}