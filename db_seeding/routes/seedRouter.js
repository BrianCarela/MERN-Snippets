const router = require('express').Router();

const plantTheData = require('../controllers/seedController');

// localhost:3001/seed/:collectionName
router.post('/:collectionName', plantTheData);

module.exports = router;