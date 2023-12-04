const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const app = express();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());


app.listen(6000, ()=> {
    console.log("This app runs on port 6000")
})