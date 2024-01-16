const router = require('express').Router();

const {
    getAllPokemons,
    getOnePokemon,
    createOnePokemon,
    deleteOnePokemon,
    updateOnePokemon
} = require('../controllers/PokemonController');

// localhost:3001/Pokemon/allPokemons
router.get('/allPokemons', getAllPokemons);

// localhost:3001/Pokemon/onePokemon/:Name
router.get('/onePokemon/:Name', getOnePokemon);

// localhost:3001/Pokemon/createOnePokemon
router.post('/createOnePokemon', createOnePokemon);

// localhost:3001/Pokemon/deleteOnePokemon/:Name
router.delete('/deleteOnePokemon/:Name', deleteOnePokemon);

// localhost:3001/Pokemon/updateOnePokemon/:Name
router.put('/updateOnePokemon/:Name', updateOnePokemon);

module.exports = router;