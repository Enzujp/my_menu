const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

module.exports.recipes_get = (req, res) => {
    res.render('recipes')
}

module.exports.recipes_post = (req, res) => {
    const { name, recipe } = req.body
    const newRecipe = new Recipe({
        name: name,
        recipe: recipe
    })
        newRecipe.save()
    return res.status(201).json({
        message: "Recipe created successfully",
        recipe: newRecipe
    })
}