const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// controller routes for signups and logins 
module.exports.signup_get = (req, res) => {
    res.render("signup")
}

module.exports.signup_post = async (req, res) => {
    try {
        const { username, password } = req.body;
        // check for existing user
        const existingUser = User.findOne({ username })
        if (!existingUser) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({username, encryptedPassword});
            // user.save()
            res.status(200).json({
                message: "User created successfully",
                user: user,
                password: encryptedPassword
            })
        } else {
            res.status(403).json({
                message: "Sorry, a user with this name already exists, try another or login if it's you"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports.login_get = (req, res) => {
    res.render("login")
}

module.exports.login_post = (req, res) => {
    pass
}