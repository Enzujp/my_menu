const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const app = express();

const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

// Initialize dotenv for use
require ("dotenv").config();

// set up view engine
app.set('view engine', 'ejs')

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'));



// set connection port
const PORT = process.env.PORT || 8000
// connect to database and start up server
const dbURI = "mongodb+srv://jay:jessedavid@menu.08vbsfz.mongodb.net/"
mongoose.connect(dbURI)
.then((result) => app.listen(PORT, console.log(`Online, Connected to database at port ${PORT}!`)))
.catch((err)=> console.log(err))

// start up server 
// app.listen(8000, ()=> {
//     console.log("This app runs on port 8000")
// })


// Request handling routes
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/smoothies', (req, res) => {
    res.render('smoothies')
})

app.use(authRoutes);
app.use(recipeRoutes);