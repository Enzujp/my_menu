const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, "Please enter an Email"],
        lowercase: true,
        unique: true
        
        // install validator for email checks
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum Password length should be 6 Characters']
    }
})


module.exports = mongoose.model('User', userSchema);