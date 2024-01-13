const Pokemon = require('../models/exampleModel');

async function getAllPokemon (req, res) {
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
        let result = await Pokemon.findOne({name: req.params.name});

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
        let newPokemon = {
            name: req.body.name,
        }

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
        await Pokemon.deleteOne({ name: req.params.name });

        res.json({
            message: 'success',
            payload: req.params.name
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
        let targetPokemon = await Pokemon.findOne({ name: req.params.name })

        console.log(`targetPokemon: ${targetPokemon}`)

        // ternaries avoid inputting undefined values
        let updatedPokemon = {
            name: req.body.name ? req.body.name : targetPokemon.name
        }

        console.log(`body: ${req.body.name}`)

        await Pokemon.updateOne(
            { name: req.params.name },
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
    getAllPokemon,
    getOnePokemon,
    createOnePokemon, 
    deleteOnePokemon,
    updateOnePokemon
}