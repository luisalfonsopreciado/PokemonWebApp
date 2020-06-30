const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    name: {
        type : String,
    },
    pokemonNumber: {
        type: Number,
    }
})

module.exports = pokemonSchema
