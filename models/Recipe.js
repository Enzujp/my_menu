const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a recipe name']
    },
    ingredients: {
        type: String,
        required: [true, 'Please enter the ingredients for your recipe']
    },
    recipeImage: {
        type: String, // uses url 
        required: true

    }

});


module.exports = mongoose.model('Recipe', recipeSchema);