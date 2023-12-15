const jwt = require("jsonwebtoken");
const User = require("../models/User");

// check for token validity

const requireAuth = (res, req, next) => {
    const token = req.header('Authorization'); // accesses the jwt sent to the header

    //verify token
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.status(401).json({
                    message: "Unauthorized access"
                })
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login')
    }
};


// middleware to protect routes
const checkUser = (res, req, next) => {
    const token = req.headers('Authorization');

    // check token validity
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                res.locals.user = null; // do not send back a user if token is not verifiable
                res.status(401).json({
                    message: "Unathorized User"
                })
            } else {
                let user = User.findById(decodedToken.id); // since id was used as payload
                res.locals.user = user;
                next();
            }
        })
    } else {
        // return null if token isnt passed
        res.locals.user = null;
    }
}


module.exports = {requireAuth, checkUser}