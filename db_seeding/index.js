const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan')
const connectToMongoDB = require('./db/mongodb');
require('dotenv').config();

// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// logs requests to the server
app.use(logger('dev'))

const PokemonRouter = require('./routes/PokemonRouter');
// localhost:3001/Pokemon/...
app.use('/Pokemon', PokemonRouter);

const seedRouter = require('./routes/seedRouter');
// localhost:3001/seed/...
app.use('/seed', seedRouter);

const PORT = 3001

app.listen(PORT, () => {
    console.log(`server listening on port 3001`);

    connectToMongoDB();
});