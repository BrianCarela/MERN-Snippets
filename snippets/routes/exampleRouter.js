const router = require('express').Router();

const {
    getAllPokemon,
    getOnePokemon,
    createOnePokemon,
    deleteOnePokemon,
    updateOnePokemon
} = require('../controllers/exampleController');

// localhost:3001/Pokemon/allPokemon
router.get('/allPokemon', getAllPokemon);

// localhost:3001/Pokemon/onePokemon/:name
router.get('/onePokemon/:name', getOnePokemon);

// localhost:3001/Pokemon/createOnePokemon
router.post('/createOnePokemon', createOnePokemon);

// localhost:3001/Pokemon/deleteOnePokemon/:name
router.delete('/deleteOnePokemon/:name', deleteOnePokemon);

// localhost:3001/Pokemon/updateOnePokemon/:name
router.put('/updateOnePokemon/:name', updateOnePokemon);

module.exports = router;