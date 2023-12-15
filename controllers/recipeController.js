const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

module.exports.all_recipes_get = async (req, res) => {
    // res.render('recipes') // this prints out available recipes from the prepopulated ejs file
    // but what is required are the recipes created and stored in the database

    Recipe.find() // returns all available recipes
    .select("_id name recipe recipeImage")
    .exec()
    try {
        const recipes = await Recipe.find()
        if (recipes) {
            const objectResponse = {
                count: recipes.length,
                recipes: recipes.map(recipe => {
                    return {
                        _id: recipe._id,
                        name: recipe.name,
                        ingredients: recipe.ingredients
                    }
                })
            }
            res.status(200).json({
                objectResponse
            })
        } else {
            res.status(204).json({
                message: "No recipes have been created"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Couldn't fetch recipes at this time, please try again in a little while"
        })
    }
}

module.exports.add_recipe_post = async (req, res, next) => {
    // check to see if recipe already exists
    const {name, ingredients} = req.body
    try {
        const recipe = new Recipe({
            name: name,
            ingredients: ingredients,
            recipeImage: req.file.path
        })
        recipe.save();

        res.status(200).json({
            message: "Recipe has been successfully added",
            newRecipe: {
                name: recipe.name,
                ingredients: recipe.ingredients,
                image: recipe.recipeImage
            }
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Sorry, we can't upload this recipe at this time, please try in a little while"
        })
    }
}

// Get recipe by id
module.exports.find_recipe_by_id_get = async (req, res) => {
    const id = req.params.recipeId;
    try {
        const recipe = await Recipe.findById(id)
        .select('name ingredients recipeImage')
        .exec()
        if (recipe) {
            res.status(200).json({
                name: recipe.name,
                ingredients: recipe.ingredients,
                image: recipe.recipeImage
            })
        } else {
            res.status(404).json({
                message: "Could not find results matching these paramaters"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Could not fetch this particular recipe right now, please give it some time and try again."
        })
    }
}

module.exports.recipe_patch = (req, res) => {
    pass
}

module.exports.delete_recipe_by_id_get = async (req, res) => {
    const id = req.params.recipeId;
    try {
        await Recipe.remove({id: id}).exec()
        res.status(200).json({
            message: "This recipe has been successfully deleted"
        })
        
    } catch (error) {
        res.status.json({
            error: error,
            message: "Could not carry out this action at this time, please try again in a while."
        })
    }
}

