/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const userModel = require("../models/user");
const path = require("path");


//Route to direct use to Registration form
router.get("/register",(req,res)=>
{
    res.render("User/register");
});

//Route to process user's request and data when user submits registration form
router.post("/register",(req,res)=>
{ 

    const newUser = 
    {
        fname:req.body.fname,
        lname:req.body.lname,
        phone:req.body.phone,
        email:req.body.email,
        pswd:req.body.pswd
    }

    const user = new userModel(newUser);
    user.save()
    .then((user)=>{

        req.files.profilePic.name = `pro_pic_${user._id}${path.parse(req.files.profilePic.name).ext}`;

        req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
        .then(()=>{


            userModel.updateOne({_id:user._id},{
                profilePic: req.files.profilePic.name
            })
            .then(()=>{
                res.redirect(`/user/profile/${user._id}`)
            })

        })
      
      
       
    })
    .catch(err=>console.log(`Error while inserting into the data ${err}`));
 
});

//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    res.render("User/login");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{

    res.redirect("/user/profile/")
});



router.get("/profile/:id",(req,res)=>{


    userModel.findById(req.params.id)
    .then((user)=>{

        const {profilePic} =user;

        res.render("User/userDashboard",{
            profilePic
        });

    })
    .catch(err=>console.log(`Error :${err}`))

    
})



module.exports=router;