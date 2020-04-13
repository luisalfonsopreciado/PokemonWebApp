const express = require('express')
const router = new express.Router()
const Pokemon = require('../models/Pokemon.js')

router.get("/pokemon", async(req,res)=> {
    try{
        const pokemon = await Pokemon.find({})
        res.status(200).send(pokemon)
    }catch(e){
        res.status(500).send()
    }

})

router.post("/pokemon/create", async(req,res)=> {
    try{
        const pokemon = await Pokemon.create(req.body)
        res.status(200).send(pokemon)
    }catch(e){
        res.status(400).send()
    }
})

router.delete("/pokemon/delete", async(req,res)=> {

    try{
        await Pokemon.findOneAndDelete({name: req.body.name})
        res.send("Pokemon Deleted Successfully")
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router