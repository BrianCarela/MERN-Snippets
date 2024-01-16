const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema(
    {
        PokedexNo: {
            type: Number,
            unique: true,
            required: true
        },
        Name: {
            type: String,
            unique: true,
            required: true
        },
        Type: {
            type: String,
            required: true
        },
        Moves: [{
            type: String
        }]
    }
)

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;