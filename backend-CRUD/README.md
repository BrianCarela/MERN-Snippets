# Snippets
***

## Overview:
- Intro
- Structure
- How to create a snippet
- index.js
- - IMPORTS
- - MIDDLEWARE
- - ROUTES
- - POWER
- db/mongodb.js
- models/ExampleModel.js
- routes/ExampleRouter.js
- controllers/ExampleController.js

***

## Intro

Snippets will allow us to generate large amounts of code much faster, shortening the development life cycle of our APIs / applications.

Before using snippets to auto-complete some code, let's make sure that we install the necessary dependencies so that testing becomes smooth.

Use the following commands when making any API:

`npm init -y`

`npm install express morgan dotenv mongoose`

Make sure you create your `.env` file to connect your app to your database

## Structure

Once your dependencies are installed, make sure you have the following folders / files prepared

- controllers/
- - ExampleController.js
- db/
- - mongodb.js
- models/
- - ExampleModel.js
- routes/
- - ExampleRouter.js
- index.js
- .env

## How to create a snippet

1. Press `CTRL+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Snippets: Configure user Snippets" and select it
3. Type "Javascript" and select it
4. Create a snippet with the following format: 

```js
{
    "Insert-snippet-name-here": {
        "prefix": "insert-prefix-here",
        "body": [
            "insert-line-of-code-here",
            "insert-line-of-code-here",
            "insert-line-of-code-here",
        ],
        "description": "insert-description-here"
    }
}
```

- The snippet name should say what the snippet is being used for
- The prefix is what you type to open up the dropdown menu of snippets
- Each item within the body is a line of code that you want to auto-generate
- The description is just a full description of what the snippet is.

## How to use a snippet

1. Begin typing the prefix until you see it highlighted on the drop-down menu that appears.
2. Hit the `tab` key to generate your prepared code
3. Certain variables may be highlighted for you to rename yourself. Those will be specified in each section
4. Use VSCode's "Find and Replace" function to replace any other variable names or phrases as necessary

## index.js

Let's set something up with imports, middleware, and the ability to test servers quickly

Here is each snippet you will need, these will go inside your `javascript.json` where you are adding/editing snippets

### IMPORTS

```js
"MERN-index-imports": {
		"prefix": "server-imp",
		"body": [
			"const express = require('express');",
			"const app = express();",
			"const logger = require('morgan')",
			"const connectToMongoDB = require('./db/mongodb');",
			"require('dotenv').config();"
		],
		"description": "Make some basic imports for your backend server in the MERN stack"
	}
```

Nothing too special to take note of here

### MIDDLEWARE

```js
"MERN-index-middleware": {
        "prefix": "server-mid",
        "body": [
			"// Read incoming requests properly",
			"app.use(express.urlencoded({ extended: false }));",
			"app.use(express.json());",
			"// logs requests to the server",
			"app.use(logger('dev'))"
        ],
        "description": "Necessary middleware"
    }
```

Basic middleware. When testing fullstack, make sure to include any code that resolves the CORS issue.

### ROUTES

```js
"MERN-index-routes": {
        "prefix": "server-routes",
        "body": [
            "const ${1:collectionName}Router = require('./routes/${1:collectionName}Router');",
			"// localhost:3001/...",
			"app.use('/${1:collectionName}', ${1:collectionName}Router);"
        ],
        "description": "insert-description-here"
    }
```

Everywhere you see `${1:collectionName}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that this set of routes refers to.

CAPITALIZE THE FIRST LETTER OF THE COLLECTION NAME TO KEEP CONSISTENCY ACROSS FILES (or use a naming convention that feels convenient to you)

### POWER

```js
"MERN-index-power": {
        "prefix": "server-pow",
        "body": [
            "const PORT = process.env.PORT",
            "",
            "app.listen(PORT, () => {",
			"    console.log(`server listening on port $${PORT}`);",
			"",
			"    connectToMongoDB();",
			"});"
        ],
        "description": "this lets us turn the server on"
    }
```

Note that the variable `PORT` is coming from the `.env` file. Make sure to place `PORT=3001` on that file while you're working locally

## db/mongodb.js

```js
"MERN-db-mongo": {
		"prefix": "connect-mongo",
		"body": [
			"const mongoose = require('mongoose');",
			"require('dotenv').config()",
			"",
			"function connectToMongoDB(){",
			"    mongoose.connect(process.env.MONGODB_URI)",
			"        .then(() => {",
			"            console.log('MONGODB CONNECTED')",
			"        })",
			"        .catch((e) => {",
			"            console.log(e)",
			"        });",
			"};",
			"",
			"module.exports = connectToMongoDB;"
		],
		"description": "Create the entire db/mongodb.js file. There is nothing to customize here"
	}
```

Nothing to note here, no changes ever need to be made to this file. Just make sure that your `.env` file is in place to be connected

## models/ExmapleModel.js

```js
"MERN-model-schema": {
        "prefix": "model-schema",
        "body": [
            "const mongoose = require('mongoose');",
            "",
            "const ${1:model}Schema = new mongoose.Schema(",
			"    {",
			"        ${2:property}: {",
			"            type: String,",
			"            unique: true,",
			"            required: true",
			"        },",
			"    }",
			")",
			"",
			"const ${1:model} = mongoose.model('${1:model}', ${1:model}Schema);",
			"",
			"module.exports = ${1:model};"
        ],
        "description": "Creates an example Model/Schema file, replace the words 'model' with the name of your data collection"
    }
```

Everywhere you see `${1:model}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that this model is for.

Where you see `${2:property}` is where you should begin specifying the properties for this collection of data.

## routes/ExampleRouter.js

```js
"MERN-router": {
        "prefix": "router-template",
        "body": [
            "const router = require('express').Router();",
			"",
			"const {",
			"    getAll${1:model},",
			"    getOne${1:model},",
			"    createOne${1:model},",
			"    deleteOne${1:model},",
			"    updateOne${1:model}",
			"} = require('../controllers/${1:model}Controller');",
			"",
			"// localhost:3001/${1:model}/all${1:model}",
			"router.get('/all${1:model}', getAll${1:model});",
			"",
			"// localhost:3001/${1:model}/one${1:model}/:${2:params}",
			"router.get('/one${1:model}/:${2:params}', getOne${1:model});",
			"",
			"// localhost:3001/${1:model}/createOne${1:model}",
			"router.post('/createOne${1:model}', createOne${1:model});",
			"",
			"// localhost:3001/${1:model}/deleteOne${1:model}/:${2:params}",
			"router.delete('/deleteOne${1:model}/:${2:params}', deleteOne${1:model});",
			"",
			"// localhost:3001/${1:model}/updateOne${1:model}/:${2:params}",
			"router.put('/updateOne${1:model}/:${2:params}', updateOne${1:model});",
			"",
			"module.exports = router;",
        ],
        "description": "insert-description-here"
    }
```

Everywhere you see `${1:model}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that these routes are referring to.

Where you see `${2:params}` is where you should use VSCode's "Find and Replace" function to replace this with the property you are using to identify specific documents in your data collection

## controlers/ExampleController.js

```js
"MERN-controller": {
        "prefix": "controller-template",
        "body": [
            "const ${1:collectionName} = require('../models/${1:collectionName}Model');",
			"",
			"async function getAll${1:collectionName} (req, res) {",
			"    try {",
			"        let results = await ${1:collectionName}.find({});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: results",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'get all ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj)",
			"",
			"        res.json(errorObj)",
			"    }",
			"}",
			"",
			"async function getOne${1:collectionName} (req, res) {",
			"    try {",
			"        let result = await ${1:collectionName}.findOne({${2:propertyName}: req.params.${2:propertyName}});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: result",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'get ONE ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj)",
			"",
			"        res.json(errorObj)",
			"    }",
			"}",
			"",
			"async function createOne${1:collectionName}(req, res){",
			"    try {",
			"        // Accepting the front-end form data from the client to generate the document",
			"        let new${1:collectionName} = {",
			"            ${2:propertyName}: req.body.${2:propertyName},",
			"        }",
			"",
			"        // post the new document to the ${1:collectionName} collection",
			"        await ${1:collectionName}.create(new${1:collectionName});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: new${1:collectionName}",
			"        });",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'create one ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj);",
			"",
			"        res.json(errorObj);",
			"    }",
			"}",
			"",
			"async function deleteOne${1:collectionName}(req, res) {",
			"    try {",
			"        await ${1:collectionName}.deleteOne({ ${2:propertyName}: req.params.${2:propertyName} });",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: req.params.${2:propertyName}",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'delete one ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj);",
			"",
			"        res.json(errorObj);",
			"    }",
			"}",
			"",
			"async function updateOne${1:collectionName}(req, res){",
			"    try {",
			"        let target${1:collectionName} = await ${1:collectionName}.findOne({ ${2:propertyName}: req.params.${2:propertyName} })",
			"",
			"        // dynamic update, merge existing and new values",
			"        let updated${1:collectionName} = {",
			"            ...target${1:collectionName}.toObject()",
			"            ...req.body",
			"        }",
			"",
			"        await ${1:collectionName}.updateOne(",
			"            { ${2:propertyName}: req.params.${2:propertyName} },",
			"            { $$set: updated${1:collectionName} },",
			"            { upsert: true }",
			"        )",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: updated${1:collectionName}",
			"        });",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'update one ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj);",
			"",
			"        res.json(errorObj);",
			"    }",
			"}",
			"",
			"module.exports = {",
			"    getAll${1:collectionName},",
			"    getOne${1:collectionName},",
			"    createOne${1:collectionName}, ",
			"    deleteOne${1:collectionName},",
			"    updateOne${1:collectionName}",
			"}",
        ],
        "description": "Replace 'collectionName' with the name of the data collection that is being controlled. Replace 'propertyName' with the different properties from the data that can be used to find/update/delete from the database. Make sure to look carefully at the create/update functions, as generating a new document depends on the original Model"
    },
```

Everywhere you see `${1:collectionName}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that these functions are referring to.

Where you see `${2:propertyName}` is where you should use VSCode's "Find and Replace" function to replace this with the property you are using to identify specific documents in your data collection
