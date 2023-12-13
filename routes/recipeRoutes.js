const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");    

router.get('/recipes', recipeController.recipes_get),
router.post('/recipes', recipeController.recipes_post)


module.exports = router;