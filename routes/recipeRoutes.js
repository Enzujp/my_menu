const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");    

// view all available recipes
router.get('/recipes', recipeController.all_recipes_get),

// create new recipe
router.post('/recipes', recipeController.add_recipe_post),

// get recipe using recipe id
router.get('/recipes/:recipeId', recipeController.find_recipe_by_id_get),

// delete recipes
router.get('recipe/:recipeId', recipeController.delete_recipe_by_id_get)


module.exports = router;