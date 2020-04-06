const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// load roomlist 
//const roomModel = require("../models/room");
//load the environment variable file
require('dotenv').config({path:"./config/keys.env"});


const app = express();
const mongoose = require("mongoose");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//This allows express to make my static content avialable from the public
app.use(express.static('public'));

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req,res,next)=>{

  if(req.query.method == "PUT")
  {
      req.method="PUT"
  }

  else if(req.query.method == "DELETE")
  {
      req.method="DELETE"
  }

  next();
})



//load controllers
const generalController = require("./controllers/general");
const roomController = require("./controllers/room");

//map each controller to the app object

app.use("/",generalController);
app.use("/room",roomController);



app.get("/", (req, res) => {
  console.log(process.env.TWILIO_TOKEN);
  console.log(process.env.SENDGRID_API_KEY);
  res.render("home", {
    title: "Home",
    headingInfo: "HOME PAGE",
    room : roomModel.getallRooms()
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
    room : roomModel.getallRooms()
  })

});

app.get("/Login", (req, res) => {

  res.render("Login", {
    title: "Login",
    headingInfo: " User Login page ",
  })

});

app.get("/dashboard",(req,res)=>{

  res.render("dashboard",{
      title: "Dashboard Page",
      headingInfo : "Dashboard Page"

  })
});

// post validation

app.post("/search",(req,res)=>{

  const errors= [];

if(req.body.where == "")
{
  errors.push("Must enter a place where you want");

}

if(req.body.Arrive == "")
{
  errors.push("Must enter Arrive date")
}

if(req.body.Depart == "")
{
  errors.push("Must enter Departure date")
}
if(req.body.guests == "")
{
  errors.push("Must enter number of guests")
}

if(errors.length > 0)
{
  res.render("dashboard",{
    messages : errors
  })
}


});

app.post("/Validation", (req,res)=>{

const errors=[];

if(req.body.fname == ""){
    errors.push("Enter your firstname.");
}
if(req.body.lname == ""){
  errors.push("Enter your lastname.");
}
if(req.body.email == ""){
  errors.push("Enter your email address.");  
}
if(req.body.pswd == ""){
  errors.push("Enter your password.");
}
else if(req.body.pswd.length < 6){
  errors.push("Password should be of minimum  5 characters");
}

if(errors.length > 0 )
{
res.render("Registration",{
    messages:errors
})
}
else {

  const accountSid = process.env.TWILIO_AUTHID;
  const authToken = process.env.TWILIO_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
    .create({
       body: `${req.body.fname} ${req.body.lname} Email :${req.body.email}`,
       from: '+12065678156',
       to: `${req.body.phone}`
     })
    .then(messages => {
      console.log(messages.sid);
      res.render("dashboard");
    })
    .catch((err)=>{
        console.log(`Error ${err}`);
    })
}
});


app.post("/login-Validation", (req,res)=>{

const errors=[];

if(req.body.uname == ""){
    errors.push("Enter your Username.");
    
}

if(req.body.pswd == ""){
  errors.push("Must Enter your password.");
}
else if(req.body.pswd.length < 6){
  errors.push("Password should be of minimum 5 characters");
}
if(errors.length > 0 )
{
res.render("login",{
    messages:errors
})
}
else {
res.render("dashboard", {
title:"YOUR PROFILE",

});
}
});

//DATABASE CONNECTION 

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to the MongoDB Database");
})
.catch(err=>{console.log(`Error occured when connecting to database. ${err}`)})




                                                                                                          

const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
  console.log("web server is running");
});