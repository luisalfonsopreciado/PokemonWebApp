const express = require('express')
require('./db/mongoose')
const app = express()
const userRouter = require('./routes/user.js')
const port = process.env.PORT || 3000;

const Pokemon = require('./models/Pokemon')

app.use(express.json())
app.use(userRouter)
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

app.listen(port, () => {
    console.log("Server listening on port: " + port)
})