const express = require('express')
const router = express.Router();

//load productModel 
const roomModel = require("../models/room");

//show all products

router.get("/room-listing", (req, res) => {

    res.render("RoomList", {
      title: "Room Listing",
      headingInfo: "Room Listing Page",
      room : roomModel.getallRooms()
    })
  
  });


router.get("/dashboard",(req,res)=>{

    res.render("dashboard",{
        title: "Dashboard Page",
        headingInfo : "Dashboard Page"
  
    })
  });

  router.get("/register", (req, res) => {
    res.render("Registration", {
      title: "User Registration",
      headingInfo: "register now",
    })
  });

  router.get("/Login", (req, res) => {

    res.render("Login", {
      title: "Login",
      headingInfo: " User Login page ",
    })
  
  });


router.post("/search",(req,res)=>{

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

  module.exports=router;