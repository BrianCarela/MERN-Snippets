const Pokemon = require('../models/PokemonModel');

async function getAllPokemons (req, res) {
    try {
        let results = await Pokemon.find({});

        res.json({
            message: 'success',
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: 'get all Pokemon failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function getOnePokemon (req, res) {
    try {
        let result = await Pokemon.findOne({Name: req.params.Name});

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'get ONE Pokemon failure',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function createOnePokemon(req, res){
    try {
        // Accepting the front-end form data from the client to generate the document
        let newPokemon = req.body



        // post the new document to the Pokemon collection
        await Pokemon.create(newPokemon);

        res.json({
            message: 'success',
            payload: newPokemon
        });
    } catch (error) {
        let errorObj = {
            message: 'create one Pokemon failure',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function deleteOnePokemon(req, res) {
    try {
        await Pokemon.deleteOne({ Name: req.params.Name });

        res.json({
            message: 'success',
            payload: req.params.Name
        })
    } catch (error) {
        let errorObj = {
            message: 'delete one Pokemon failure',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateOnePokemon(req, res){
    try {
        let targetPokemon = await Pokemon.findOne({ Name: req.params.Name })

        // ternaries avoid inputting undefined values
        let updatedPokemon = {
            Name: req.body.Name ? req.body.Name : targetPokemon.Name,
        }

        await Pokemon.updateOne(
            { Name: req.params.Name },
            { $set: updatedPokemon },
            { upsert: true }
        )

        res.json({
            message: 'success',
            payload: updatedPokemon
        });
    } catch (error) {
        let errorObj = {
            message: 'update one Pokemon failure',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

module.exports = {
    getAllPokemons,
    getOnePokemon,
    createOnePokemon, 
    deleteOnePokemon,
    updateOnePokemon
}