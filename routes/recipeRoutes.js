const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
// const { multer, upload, storage, fileFilter } = require("../controllers/recipeController")
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


// view all available recipes
router.get('/recipes', recipeController.all_recipes_get),

// create new recipe
// add checkAuth middleware after api test 
router.post('/recipes', upload.single('recipeImage'),recipeController.add_recipe_post),

// get recipe using recipe id
router.get('/recipes/:recipeId', recipeController.find_recipe_by_id_get),

// patch recipe
router.patch('/recipes/:recipeId', recipeController.recipe_patch),

// delete recipes
router.get('recipe/:recipeId', recipeController.delete_recipe_by_id_get)


module.exports = router;