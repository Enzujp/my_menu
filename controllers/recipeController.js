const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

module.exports.all_recipes_get = (req, res) => {
    // res.render('recipes') // this prints out available recipes from the prepopulated ejs file
    // but what is required are the recipes created and stored in the database

    Recipe.find() // returns all available recipes
    
}

module.exports.add_recipe_post = (req, res) => {
    // check to see if recipe already exists
}

module.exports.find_recipe_by_id_get = (req, res) => {
    pass
}

module.exports.delete_recipe_by_id_get = (req, res) => {
    pass
}