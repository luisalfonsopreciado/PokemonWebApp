const express = require("express");
const router = new express.Router();
const User = require("../models/User.js");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

router.get("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send("User Deleted Successfully");
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "first_name", "last_name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: "Logged Out Successfully" });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(["Unable to Log in With The Provided Credentials"]);
  }
});

router.post("/users/create", async (req, res) => {
  const user = new User(req.body);
  const error = user.validateSync();
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    let errorMessage = "A user with that email is already registered";
    if (error) {
      const errors = Object.values(error.errors);
      errorMessage = errors[0].message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/users/favorite", auth, async (req, res) => {
  res.status(200).send(req.user.favoritePokemons);
});

router.post("/users/favorite", auth, async (req, res) => {
  try {
    req.user.favoritePokemons.push(req.body);
    await req.user.save();
    res.status(200).send(req.user.favoritePokemons);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/favorite", auth, async (req, res) => {
  try {
    const isSamePokemon = (pokemon) => pokemon.name == req.body.name;
    const index = req.user.favoritePokemons.findIndex(isSamePokemon);
    req.user.favoritePokemons.splice(index, 1);
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File Must be JPG JPEG PNG"), true);
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
