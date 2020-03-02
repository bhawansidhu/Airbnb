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

app.post("/sendMessage",(req,res)=>{

  const errors= [];

if(req.body.where == "")
{
  errors.push("Sorry, you must enter a place");

}

if(req.body.checkin == "")
{
  errors.push("Sorry, you must enter checkin date")
}

if(req.body.checkout == "")
{
  errors.push("Sorry, you must enter checkout date")
}
if(req.body.guests == "")
{
  errors.push("Sorry, you must enter number of guests")
}

if(errors.length > 0)
{
  res.render("home",{
    messages : errors
  })
}


});

app.post("/validation", (req,res)=>{

const errors=[];

if(req.body.uemail == ""){
    errors.push("Please enter your email address.");  
}

if(req.body.fname == ""){
    errors.push("Please enter your firstname.");
}
if(req.body.lname == ""){
  errors.push("Please enter your lastname.");
}
if(req.body.psw == ""){
  errors.push("Please enter your password.");
}
else if(req.body.psw.length < 9){
  errors.push("Password should be of atleast 8 characters");
}

if(errors.length > 0 )
{
res.render("userRegistration",{
    messages:errors
})
}
else {

  const accountSid = 'ACd6049fb80af6f0a16b1904f22302a65d';
  const authToken = 'ef8ba379a6621b7dd13ef7ef399d4e1f';
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
    .create({
       body: `${req.body.fname} ${req.body.lname} Email :${req.body.uemail}`,
       from: '+14805088853',
       to: `${req.body.phone}`
     })
    .then(messages => {
      console.log(messages.sid);
      res.render("home");
    })
    .catch((err)=>{
        console.log(`Error ${err}`);
    })
}
});


app.post("/validation-login", (req,res)=>{

const errors=[];

if(req.body.uname == ""){
    errors.push("Please enter your first name.");
    
}

if(req.body.psw == ""){
  errors.push("Please enter your password.");
}
else if(req.body.psw.length < 9){
  errors.push("Password should be of atleast 8 characters");
}
if(errors.length > 0 )
{
res.render("login",{
    messages:errors
})
}
else {
res.render("roomListing", {
title:"Room List Page",

});
}
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("web server is running");
});