const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Auth Routes
router.get('/signup', authController.get_signup);
router.post('/signup', authController.post_signup);
router.get('/login', authController.get_login);
router.post('/login', authController.post_login);

module.exports = router;