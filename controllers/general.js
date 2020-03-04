const express = require('express')
const router = express.Router();

const roomModel = require("../models/room");

router.get("/",(req,res)=>{
    console.log(process.env.TWILIO_TOKEN);
    console.log(process.env.SEND_GRID_API_KEY);
    res.render("home",{
        title: "Airbnb",
        headingInfo : "Home Page",
        room : roomModel.getallRooms()
    });
});


router.get("/room-listing", (req, res) => {

    res.render("RoomList", {
      title: "Room Listing",
      headingInfo: "Room Listing Page",
      room : roomModel.getallRooms()
    })
  
  });


  

router.post("/Validation", (req,res)=>{

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
    res.render("dashboard",{
        messages:errors
    })
    }

    else {
      //Send Message , once user register
        const accountSid = process.env.TWILIO_AUTHID;
        const authToken = process.env.TWILIO_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
      to: `bhawansidhu2@gmail.com`,
      from: `${req.body.email}`,
      subject: 'Welcome to Airbnb',
      text: 'Hello, How are oyu ? ',
      html: `Visiter's Full Nmae ${fname} ${lname}`,
    };
    
    sgMail.send(msg)
    .then(() => {
        res.redirect("dashboard");
    })
    .catch((err)=>{
      console.log(err);
    })
        
      // client.messages
          .create({
             body: `${req.body.fname} ${req.body.lname} Email :${req.body.email}`,
             from: '',
            to: `${req.body.phone}`
           })
         .then(messages => {
           console.log(messages.sid);
           res.render("dashboard");
         })   
         .catch((err)=>{
           console.log(err);
          })
}
    });
    module.exports=router;
    