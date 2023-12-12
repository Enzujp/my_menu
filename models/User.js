const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your name'],
        unique: true,
        lowercase: true,
        minlength: [4, 'Please enter a name longer than 3 letters']
    },

    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Please enter a password longer than 5 characters'],
        lowercase: true
    }
})


module.exports = mongoose.model('User', userSchema);