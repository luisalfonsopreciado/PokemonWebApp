const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000;
const User = require('./models/User')
const Pokemon = require('./models/Pokemon')

app.use(express.json())
app.get("/users", async(req, res) => {
    try{
        const user = await User.find({})
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }

})

app.get("/pokemon", async(req,res)=> {
    try{
        const pokemon = await Pokemon.find({})
        res.status(200).send(pokemon)
    }catch(e){
        res.status(500).send()
    }

})

app.post("/pokemon/create", async(req,res)=> {
    try{
        const pokemon = await Pokemon.create(req.body)
        res.status(200).send(pokemon)
    }catch(e){
        res.status(400).send()
    }

})

app.post("/users/create", async(req, res)=> {
    try{
        const user = await User.create(req.body)
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send()
    }
})
app.listen(port, () => {
    console.log("Server listening on port: " + port)
})