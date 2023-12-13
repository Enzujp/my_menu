const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// generate user token
const userToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '2h'})
}

// controller routes for signups and logins 
module.exports.signup_get = (req, res) => {
    res.render("signup")
}

module.exports.signup_post = async(req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = User.findOne({ username })
        if (existingUser) {
            res.status(409).json({
                message: "This User already exists, choose another username"
            })
        } else {
            bcrypt.hash(password, 10, (err, encryptedPassword) => {
                if (err) {
                    res.status(500).json({
                        err: err,
                        message: "Couldn't hash this"
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: username,
                        password: encryptedPassword
                    })
                    const token = userToken(user.username)
                    user.save();
                    res.status(201).json({
                        message: "User created Successfully",
                        user: username,
                        token: token
                    })
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
} 


module.exports.login_get = (req, res) => {
    res.render("login")
}

module.exports.login_post = (req, res) => {
    pass
}