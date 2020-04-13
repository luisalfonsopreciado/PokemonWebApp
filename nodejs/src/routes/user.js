const express = require('express')
const router = new express.Router()
const User = require('../models/User.js')

router.get("/users", async(req, res) => {
    try{
        const user = await User.find({})
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }

})

router.post("/users/create", async(req, res)=> {
    try{
        const user = await User.create(req.body)
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router