# Snippets: Database Seeding

***

# Objectives:
- Importance of keeping database backups (seeds)
- How to export
- The Setup
- Snippets
- How to import


***

## Database backups

Throughout this course, we have been testing our databases by occasionally uploading starter data before making a request to GET this data from the database. As you develop applications that get larger and have collections of data connect, or are related to each other, you may need to drop the database and start over, but you want to keep a copy of it. This is either because the data is useful to have during the testing/development phase, or because there are already clients/users on your app, and want to keep their data safe. This is the perfect use case for exporting a copy of your database from Compass, and then importing it to fill up your database again.

## How to export

To export, simply follow these steps:

1. With Compass open, select your database & collection of data you wish to export.
2. Click the white "Export Data" button
3. Select "Export the full collection" button.
4. Select "JSON" and click "Export...". 
5. Go into the folder where your application exists, and in the `models/` folder, name the file `collectionNameSeed.json` where `collectionName` is the name of the collection of data you are exporting.

Keep in mind that this will keep the previous ID's of each document.

## The Setup

To make sure this works, there are only 2 files you need to create:

1. `controllers/seedController.js`
2. `routes/seedRouter.js`

And 1 other file to plug this route into:

3. `index.js`

On these files, you will be filling it with the snippets seen below

## Snippets

First, let's assume that the starter data has already been placed in the `models/` folder.

Remember to add this to your javascript snippets:

```js
"MERN-db-seeding": {
		"prefix": "seed-Controller",
		"body": [
			"const mongoose = require('mongoose')",
			"",
			"async function plantTheData(req, res) {",
			"    try {",
			"        // Get the Mongoose model for the specified collection",
			"const CollectionModel = mongoose.model(req.params.collectionName);",
			"",
			"        // Collect the appropriate file",
			"        const jsonFile = require('../models/'+req.params.collectionName+'Seed.json') ",
			"",
			"        // If jsonFile is already an object, no need to parse",
			"        const data = typeof jsonFile === 'object' ? jsonFile : JSON.parse(jsonFile);",
			"",
			"        // Iterate through each item in the JSON array",
			"        for (const item of data) {",
			"          // Exclude the _id property",
			"          const { _id, ...itemWithoutId } = item;",
			"",
			"          // Create a new document using your Mongoose model",
			"          const document = new CollectionModel(itemWithoutId);",
			"",
			"          // Save the document to the database",
			"          await document.save();",
			"        }",
			"",
			"        console.log('Import completed successfully.');",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: req.params.collectionName + ' Database Restored!'",
			"        })",
			"    } catch (error) {",
			"        console.error('Error importing JSON data:', error);",
			"    }",
			"}",
			"",
			"module.exports = plantTheData;",
		],
		"description": "controllers/seedController.js : For seeding/restoring data to your app"
	},
```

On `controllers/seedController.js`, use this snippet. Here is the next snippet:

```js
"MERN-db-seeding-2": {
		"prefix": "seed-Router",
		"body": [
			"const router = require('express').Router();",
			"",
			"const plantTheData = require('../controllers/seedController');",
			"",
			"// localhost:3001/seed/:collectionName",
			"router.post('/:collectionName', plantTheData);",
			"",
			"module.exports = router;",
		],
		"description": "routes/seedRouter.js : For seeding/restoring data to your app"
	},
```

On `routes/seedRouter` is where this is placed.

Finally, here is the final snippet:

```js
"MERN-db-seeding-3": {
		"prefix": "seed-Routes",
		"body": [
			"const seedRouter = require('./routes/seedRouter');",
			"// localhost:3001/seed/...",
			"app.use('/seed', seedRouter);",
		],
		"description": "index.js : For seeding/restoring data to your app"
	},
```

Use this to plug in the route on your `index.js`

## How to import

Once you have your seed files in place, all we have to do is make a POST request on the server. MAKE SURE TO USE THE DYNAMIC PARAMETER TO NAME THE COLLECTION YOU ARE SEEDING.

For example, if your collection name is `Pokemon`, the URL you will POST to is `localhost:3001/seed/Pokemon`

Using this will both select the JSON file name and the collection name that exists on the connected database.

THIS MAY TAKE LONGER THAN YOUR AVERAGE REQUEST, PLEASE BE PATIENT

Once you test this, congratulations! You now have a quick way to reset your databse!
