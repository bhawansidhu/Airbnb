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



// post validation of home search page

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
  res.render("RoomList",{
    messages : errors
  })
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