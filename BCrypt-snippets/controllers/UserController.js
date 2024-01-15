const User = require("../models/UserModel");
const bcrypt = require('bcrypt');

async function getAllUsers(req, res) {
    try {
        let result = await User.find({});

        res.json({
            message: "success",
            payload: result
        })
    } catch (err) {
        // server-side
        console.log(`getAllUsers error:`);
        console.log(err)

        // client-side
        res.json({
            message: 'failure, getAllUsers error',
            payload: err
        })
    }
}

// may need to be updated, depending on future Log In standards
async function createUser(req, res) {
    try {
        // temporarily hold password
        let userPassword = req.body.password;

        // generate a salt
        let salt = await bcrypt.genSalt(10);

        // encrypt password
        let hashedPassword = await bcrypt.hash(userPassword, salt);

        // generate user document
        let newUser = {
            username: req.body.username,
            password: hashedPassword
        }

        // insert document into the database
        await User.create(newUser);

        // respond to client
        res.json({
            message: "success",
            payload: newUser
        })
    } catch (err) {
        // server-side
        console.log(`createUser error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `createUser error: ${err}`
        })
    }
}

// SAVE THIS FOR WHEN IT'S NEEDED
async function checkUserPassword(req, res) {
    try {
        // temporarily hold username & password separately
        let incomingUsername = req.body.username
        let incomingPassword = req.body.password

        // find correct username
        let foundUser = await User.findOne({ username: incomingUsername });

        // compare passwords
        let correctPassword = await bcrypt.compare(incomingPassword, foundUser.password);

        // respond to client based on password
        if (correctPassword) {
            // MAY NEED CHANGES
            res.json({
                message: "Success",
                payload: "Password Correct!"
            })

            console.log("return true/false elsewhere")
        } else {
            res.json({
                message: 'Success',
                payload: 'Please check password and try again'
            })
        }
    } catch (err) {
        // server-side
        console.log(`checkUserPassword error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `checkUserPassword error: ${err}`
        })
    }
}

async function updateUserPassword(req, res) {
    try {
        // temporarily hold username and password from client
        let incomingUsername = req.params.username
        let incomingOldPassword = req.body.oldPassword
        let incomingNewPassword = req.body.newPassword

        // Find the correct user
        let foundUser = await User.findOne({ username: incomingUsername });

        // Compare old password to check credentials
        let correctPassword = await bcrypt.compare(
            incomingOldPassword,
            foundUser.password
        )

        // Compare NEW password to double check that it's being changed
        let isSamePassword = await bcrypt.compare(
            incomingNewPassword,
            foundUser.password
        )

        if (isSamePassword) {
            res.json({
                message: 'success',
                payload: 'New password must be different from the old password'
            })
        } else if (correctPassword && !isSamePassword) {
            // new encryption process
            let salt = await bcrypt.genSalt(10);

            let newHashedPassword = await bcrypt.hash(incomingNewPassword, salt);

            // generate updated user
            let updatedUser = {
                username: foundUser.username,
                password: newHashedPassword
            }

            // Update it on database end
            await User.updateOne(
                { username: foundUser.username },
                { $set: updatedUser },
                { upsert: true }
            )

            // respond to client
            res.json({
                message: 'success',
                payload: 'password successfully updated'
            });
        } else if (!correctPassword) {
            res.json({
                message: 'success',
                payload: 'incoming password incorrect, please check the spelling and try again'
            })
        }
    } catch (err) {
        // server-side
        console.log(`updatePassword error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `updatePassword error: ${err}`
        })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    // checkUserPassword,
    updateUserPassword,
}