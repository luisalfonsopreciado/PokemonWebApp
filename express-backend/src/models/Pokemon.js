const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    name: {
        type : String,
        required: true,
        unique : true,
    },
    pokemonId: {
        type: Number,
        required: true,
        unique: true,
        validate(value){
            if(value < 0 ){
                throw new Error("Invalid Pokemon ID")
            }
        }
    }

})

const Pokemon = mongoose.model("Pokemon", pokemonSchema)

module.exports = Pokemon
