const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const app = express();

// set up view engine
app.set('view engine', 'ejs')

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('public'));


// connect to database and start up server
const dbURI = "mongodb+srv://jp:7T6AfexDXXonDLSR@cluster0.tdpe0ff.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI)
.then((result) => app.listen(8000, console.log("Online, Connected to database!")))
.catch((err)=> console.log(err))

// start up server 
// app.listen(8000, ()=> {
//     console.log("This app runs on port 8000")
// })


// Routes
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/recipes', (req, res) => {
    res.render('recipes')
})

app.get('/smoothies', (req, res) => {
    res.render('smoothies')
})