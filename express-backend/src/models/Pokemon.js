const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    name: {
        type : String,
    },
    pokemonId: {
        type: Number,
    }

})

// const Pokemon = mongoose.model("Pokemon", pokemonSchema)

module.exports = pokemonSchema
