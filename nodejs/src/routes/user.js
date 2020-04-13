const express = require("express");
const router = new express.Router();
const User = require("../models/User.js");
const auth = require("../middleware/auth")

router.get("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id});
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove()
    res.status(200).send("User Deleted Successfully");
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["username", "email"]
  const isValidOperation = updates.every(update=> allowedUpdates.includes(update))
  if(!isValidOperation){
    res.status(400).send({error: "Invalid Updates"})
  }
  try {
    updates.forEach(update=> req.user[update] = req.body[update])
    await req.user.save()
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logout",auth, async(req,res) => {
  try{
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Logged out successfully")
  }catch(e){
    res.status(500).send()
  }
})

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken()
    res.send({user, token});
  } catch (e) {
      res.status(400).send()
  }
});

router.post("/users/create", async (req, res) => {
  const error={}
  try {
    if(req.body.password1 !== req.body.password2){
      error.password = "Passwords Must Match"
      throw new Error()
    }
    const body = {
      username : req.body.username,
      email : req.body.email,
      password : req.body.password1,
    }
    const user = await User.create(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(error);
  }
});

module.exports = router;
