const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan')
const connectToMongoDB = require('./db/mongodb');
require('dotenv').config();

// Set view engine to EJS
app.set('view engine', 'ejs');
// Set view engine to look at the 'views' folder
app.set('views', path.join(__dirname, 'views'));
// Use the 'public' folder to read static files such as CSS
app.use(express.static(path.join(__dirname, 'public')));
// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// logs requests to the server
app.use(logger('dev'))


const exampleRouter = require('./routes/exampleRouter');
// localhost:8080/...
app.use('/Pokemon', exampleRouter);

const PORT = 3001

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);

    connectToMongoDB();
});