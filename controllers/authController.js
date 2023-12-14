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

module.exports.signup_post = async(req, res) => {
    
} 


module.exports.login_get = (req, res) => {
    res.render("login")
}

module.exports.login_post = (req, res) => {
    pass
}