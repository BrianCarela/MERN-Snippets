const mongoose = require('mongoose')

async function plantTheData(req, res) {
    try {
        // Get the Mongoose model for the specified collection
        const CollectionModel = mongoose.model(req.params.collectionName);

        // Collect the appropriate file
        const jsonFile = require('../models/'+req.params.collectionName+'Seed.json') 

        // If jsonFile is already an object, no need to parse
        const data = typeof jsonFile === 'object' ? jsonFile : JSON.parse(jsonFile);
  
        // Iterate through each item in the JSON array
        for (const item of data) {
          // Exclude the _id property
          const { _id, ...itemWithoutId } = item;

          // Create a new document using your Mongoose model
          const document = new CollectionModel(itemWithoutId);
  
          // Save the document to the database
          await document.save();
        }
  
        console.log('Import completed successfully.');

        res.json({
            message: 'success',
            payload: req.params.collectionName + ' Database Restored!'
        })
    } catch (error) {
        console.error('Error importing JSON data:', error);
    }
};

module.exports = plantTheData;