const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  favoritePokemons: [
    {
      pokemonId: { type: Number, unique: true },
      name: { type: String, unique: true },
    },
  ],
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password") || value.length < 6) {
        throw new Error("Invalid password");
      }
    },
  },
  dateJoined: {
    type: Date,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  user.dateJoined = new Date();
  next();
});
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "welcometothethunderdome"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if(!user){
      throw new Error("Incorrect Credentials")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
      throw new Error("Incorrect Credentials")
  }
  return user
};
const User = mongoose.model("User", userSchema);

module.exports = User;
