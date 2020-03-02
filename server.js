const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

//load the environment variable file
require('dotenv').config({path:"./config/keys.env"});


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//This allows express to make my static content avialable from the public
app.use(express.static('public'));

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//load controllers
const generalController = require("./controllers/general");
const productController = require("./controllers/product");

//map each controller to the app object

app.use("/",generalController);
app.use("/product",productController);



app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    headingInfo: "HOME PAGE"
  })
});

app.get("/register", (req, res) => {
  res.render("Registration", {
    title: "User Registration",
    headingInfo: "register now",
  })
});


app.get("/room-listing", (req, res) => {

  res.render("RoomList", {
    title: "Room Listing",
    headingInfo: "Room Listing Page",
  })

});

app.get("/Login", (req, res) => {

  res.render("Login", {
    title: "Login",
    headingInfo: " User Login page ",
  })

});



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("web server is running");
});