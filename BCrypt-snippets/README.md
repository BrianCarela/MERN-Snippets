# BCrypt: Snippets

***

# Objectives:
- Intro
- index.js Import User routes
- models/UserModel.js
- controllers/UserController.js
- routes/UserRouter.js
- Non-route Functions

***

## Intro

commands you may have to run before using any of the snippets:

`npm init -y`

`npm install express bcrypt mongoose dotenv nodemon morgan`

Folder/Files to be created:

- controllers/UserController.js
- db/mongodb.js
- models/UserModel.js
- routes/UserRouter.js
- index.js

## index.js

On this file, we want to import the routes necessary to connect a database of users to our app. Here is the snippet for that:

```js
"MERN-index-users": {
        "prefix": "server-user-routes",
        "body": [
            "const UserRouter = require('./routes/UserRouter');",
            "// localhost:3001/User/...",
            "app.use('/User', UserRouter);",
        ],
        "description": "plug in the routes for Users"
    }
```

There are no variables to fill in here

## models/UserModel.js

Most of this file should remain the same. If you wish to add more attributes, you can. If you wish to add timestamps, you can.

```js
"MERN-user-model": {
		"prefix": "user-model-schema",
		"body": [
			"const mongoose = require('mongoose');",
			"",
			"const userSchema = new mongoose.Schema(",
			"    {",
			"        username: {",
			"            type: String,",
			"            required: true,",
			"            unique: true",
			"        },",
			"        password: {",
			"            type: String,",
			"            required: true",
			"        }",
			"    }",
			")",
			"",
			"const User = mongoose.model('User', userSchema);",
			"",
			"module.exports = User;"
		],
		"description": "model file for Users. Use timestamps and other attributes (settings?) if it makes sense"
	},
```

## controllers/UserController.js

THIS FILE MAY BE UPDATED IN THE FUTURE TO ALIGN WITH A LOGIN PATH

```js
"MERN-Bcrypt-controller": {
        "prefix": "user-controller-template",
        "body": [
            "const User = require('../models/UserModel');",
            "const bcrypt = require('bcrypt');",
            "async function getAllUsers(req, res) {",
			"    try {",
			"        let result = await User.find({});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: result",
			"        })",
			"    } catch (err) {",
			"        // server-side",
			"        console.log(`getAllUsers error:`);",
			"        console.log(err)",
			"",
			"        // client-side",
			"        res.json({",
			"            message: 'failure, getAllUsers error',",
			"            payload: err",
			"        })",
			"    }",
			"}",
			"",
			"// may need to be updated, depending on future Log In standards",
			"async function createUser(req, res) {",
			"    try {",
			"        // temporarily hold password",
			"        let userPassword = req.body.password;",
			"",
			"        // generate a salt",
			"        let salt = await bcrypt.genSalt(10);",
			"",
			"        // encrypt password",
			"        let hashedPassword = await bcrypt.hash(userPassword, salt);",
			"",
			"        // generate user document",
			"        let newUser = {",
			"            username: req.body.username,",
			"            password: hashedPassword",
			"        }",
			"",
			"        // insert document into the database",
			"        await User.create(newUser);",
			"",
			"        // respond to client",
			"        res.json({",
			"            message: 'success',",
			"            payload: newUser",
			"        })",
			"    } catch (err) {",
			"        // server-side",
			"        console.log(`createUser error:`);",
			"        console.log(err)",
			"",
			"        // client-side",
			"        res.json({",
			"            message: 'failure, createUser error',",
			"            payload: err",
			"        })",
			"    }",
			"}",
			"",
			"// SAVE THIS FOR WHEN IT'S NEEDED",
			"async function checkUserPassword(req, res) {",
			"    try {",
			"        // temporarily hold username & password separately",
			"        let incomingUsername = req.body.username",
			"        let incomingPassword = req.body.password",
			"",
			"        // find correct username",
			"        let foundUser = await User.findOne({ username: incomingUsername });",
			"",
			"        // compare passwords",
			"        let correctPassword = await bcrypt.compare(incomingPassword, foundUser.password);",
			"",
			"        // respond to client based on password",
			"        if (correctPassword) {",
			"            // MAY NEED CHANGES",
			"            res.json({",
			"                message: 'Success',",
			"                payload: 'Password Correct!'",
			"            })",
			"",
			"            console.log('return true/false elsewhere')",
			"        } else {",
			"            res.json({",
			"                message: 'Success',",
			"                payload: 'Please check password and try again'",
			"            })",
			"        }",
			"    } catch (err) {",
			"        // server-side",
			"        console.log(`checkUserPassword error:`);",
			"        console.log(err)",
			"",
			"        // client-side",
			"        res.json({",
			"            message: 'failure, checkUserPassword error',",
			"            payload: err",
			"        })",
			"    }",
			"}",
			"",
			"async function updateUserPassword(req, res) {",
			"    try {",
			"        // temporarily hold username and password from client",
			"        let incomingUsername = req.params.username",
			"        let incomingOldPassword = req.body.oldPassword",
			"        let incomingNewPassword = req.body.newPassword",
			"",
			"        // Find the correct user",
			"        let foundUser = await User.findOne({ username: incomingUsername });",
			"",
			"        // Compare old password to check credentials",
			"        let correctPassword = await bcrypt.compare(",
			"            incomingOldPassword,",
			"            foundUser.password",
			"        )",
			"",
			"        // Compare NEW password to double check that it's being changed",
			"        let isSamePassword = await bcrypt.compare(",
			"            incomingNewPassword,",
			"            foundUser.password",
			"        )",
			"",
			"        if (isSamePassword) {",
			"            res.json({",
			"                message: 'success',",
			"                payload: 'New password must be different from the old password'",
			"            })",
			"        } else if (correctPassword && !isSamePassword) {",
			"            // new encryption process",
			"            let salt = await bcrypt.genSalt(10);",
			"            let newHashedPassword = await bcrypt.hash(incomingNewPassword, salt);",
			"",
			"            // generate updated user",
			"            let updatedUser = {",
			"                username: foundUser.username,",
			"                password: newHashedPassword",
			"            }",
			"",
			"            // Update it on database end",
			"            await User.updateOne(",
			"                { username: foundUser.username },",
			"                { $$set: updatedUser },",
			"                { upsert: true }",
			"            )",
			"",
			"            // respond to client",
			"            res.json({",
			"                message: 'success',",
			"                payload: 'password successfully updated'",
			"            });",
			"        } else if (!correctPassword) {",
			"            res.json({",
			"                message: 'success',",
			"                payload: 'incoming password incorrect, please check the spelling and try again'",
			"            })",
			"        }",
			"    } catch (err) {",
			"        // server-side",
			"        console.log(`updatePassword error:`);",
			"        console.log(err)",
			"",
			"        // client-side",
			"        res.json({",
			"            message: 'failure, updatePassword error',",
			"            payload: err",
			"        })",
			"    }",
			"}",
			"",
			"module.exports = {",
			"    getAllUsers,",
			"    createUser,",
			"    // checkUserPassword,",
			"    updateUserPassword,",
			"}"
        ],
        "description": "Create a user, find all users, check password, and update password"
    }      
```

## routes/UserRouter.js

THIS FILE MAY BE UPDATED IN THE FUTURE TO ALIGN WITH A LOGIN PATH

```js
"MERN-user-router": {
		"prefix": "user-router-template",
		"body": [
			"const router = require('express').Router();",
			"",
			"const {",
			"    getAllUsers,",
			"    createUser,",
			"    // checkUserPassword,",
			"    updateUserPassword,",
			"} = require('../controllers/UserController');",
			"",
			"// localhost:3001/User/allUsers",
			"router.get('/allUsers', getAllUsers);",
			"",
			"// localhost:3001/User/createUser",
			"router.post('/createUser', createUser);",
			"",
			"// localhost:3001/User/checkUserPassword/:username",
			"// router.post('/checkUserPassword/:username', checkUserPassword); ",
			"// will use the function, but this route will become unnecessary once the login features are implemented",
			"",
			"// localhost:3001/User/updateUserPassword/:username",
			"router.put('/updateUserPassword/:username', updateUserPassword);",
			"",
			"module.exports = router;"
		],
		"description": "router file for users. It may need updates in the future"
	},
```

## Non-route Functions

CONCLUSION: simply have an extra function `checkPassword()` on it's own, and pass data through this function when appropriate
