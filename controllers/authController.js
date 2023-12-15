const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")


// generate user token
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '2h'})
}

// controller routes for signups and logins 
module.exports.signup_get = (req, res) => {
    res.render("signup")
}

module.exports.signup_post = async (req, res) => {
    const { username, password } = req.body;
    try {
        const oldUser = await User.findOne({ username })
        if (oldUser) {
            res.status(409).json({
                message: "A user with this username already exists, choose another"
            })
        } else {
            const hash = await bcrypt.hash(password, 10);
            password = hash;
            const user = new User({username, password});
            await user.save()
            // generate user token
            const userToken = createToken(user.username);
            res.status(201).json({
                message: "User created successfully",
                token: userToken,
                user: user
            })
        }
    } catch (error) {
        res.json({
            error: error
        })
    }
} 


module.exports.login_get = (req, res) => {
    res.render("login")
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username })
        if (user) {
            const auth = bcrypt.compare(password, username.password)
            if (auth) {
                // use generated mongoose id to create token
                const token = createToken({username: user._id}) 
                res.status(200).json({
                    message: "Logged in, Welcome.",
                    token: token
                })
                res.redirect("/")
                return user
            
            }
            else {
                res.status(401).json({
                    message: "You have entered an incorrect password"
                })
            }
        } else {
            res.status(401).json({
                message: "Username doesn't exist, perhaps you should signup first?"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Error, couldn't log you in right now, please try again in a bit"
        })
    }
}