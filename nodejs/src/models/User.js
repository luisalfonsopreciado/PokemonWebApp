const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  }
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  user.dateJoined = new Date()
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
