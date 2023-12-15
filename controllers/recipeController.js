const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + new Date().toISOString());
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(fileError({
            message: "Only takes in jpeg and png formats"
        }), false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter});


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

module.exports.find_recipe_by_id_get = (req, res) => {
    pass
}

module.exports.delete_recipe_by_id_get = (req, res) => {
    pass
}