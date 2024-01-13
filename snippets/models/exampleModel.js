const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
    }
)

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;