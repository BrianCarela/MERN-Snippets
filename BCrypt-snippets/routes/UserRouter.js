const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    // checkUserPassword,
    updateUserPassword,
} = require('../controllers/UserController');

// localhost:3001/User/allUsers
router.get('/allUsers', getAllUsers);

// localhost:3001/User/createUser
router.post('/createUser', createUser);

// localhost:3001/User/checkUserPassword/:username
// router.post('/checkUserPassword/:username', checkUserPassword); 
// will use the function, but this route will become unnecessary once the login features are implemented

// localhost:3001/User/updateUserPassword/:username
router.put('/updateUserPassword/:username', updateUserPassword);



module.exports = router;