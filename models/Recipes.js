const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a recipe name']
    },
    recipe: {
        type: String,
        required: [true, 'Please enter your recipe']
    }

})


module.exports = mongoose.model('Recipe', recipeSchema);