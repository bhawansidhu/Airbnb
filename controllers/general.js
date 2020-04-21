const express = require('express');
const router = express.Router();
const roomModel = require("../models/room");
const userModel = require("../models/dash");
const adminModel = require("../models/adminRooms");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const LoggedIn = require("../middleware/auth");
const AdminorUser = require("../middleware/authorization")


//This allows express to make my static content avialable from the public
router.use(express.static('static'));


///router.use((req, res, next) => {
//   if (req.query.method == "PUT") {
//       req.method = "PUT"
//  } else if (req.query.method == "DELETE") {
//      req.method = "DELETE"
//  }
//  next();
//})

router.get("/", (req, res) => {
  console.log(process.env.TWILIO_TOKEN);
  console.log(process.env.SENDGRID_API_KEY);
  res.render("home", {
    title: "Airbnb",
    headingInfo: "Home Page",
    room: roomModel.getallRooms()
  });
});


router.get("/room-listing", (req, res) => {

  res.render("room-listing", {
    title: "Room Listing",
    headingInfo: "Room Listing Page",
    room: roomModel.getallRooms()
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
  });

})






router.get("Your-Profile",LoggedIn,AdminorUser, (req, res) => {
res.render("../views/dashboards/dashboard", {
title: "Dashboard Page",
headingInfo: "Dashboard Page",
});
})


//LOGIN PAGE Validation

//router.get("/Login-Validation", (req, res) => {
//  res.render("login", {
//      title: "SMS Page"
//  });
//});

router.post("/login-Validation", (req, res) => {

  userModel.findOne({ Email: req.body.email })
    .then(user => {

      const errors = [];
      if (user == null) {
        errors.push("Sorry , you have entered invalid credentials!");
        res.render("../views/login",
          {
            messages: errors
          })
      }

      else {
        bcrypt.compare(req.body.Pswd, user.Pswd)
          .then(isMatched => {

            if (isMatched) {
              req.session.userInfo = user;
              res.redirect("../views/dashboards/dashboard");
            }

            else {
              errors.push("Sorry , you have entered invalid credentials!");
              res.render("../views/login",
                {
                  messages: errors
                }
              )
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));

});

// if(req.body.uname == ""){
//     errors.push("Enter your Username.");

//  }

// if(req.body.pswd == ""){
//   errors.push("Must Enter your password.");
// }
// else if(req.body.pswd.length < 6){
//   errors.push("Password should be of minimum 5 characters");
// }
// if(errors.length > 0 )
// {
//  res.render("login",{
//     messages:errors
//  })
// }
// else {
//  res.render("dashboard", {
// title:"YOUR PROFILE",

// });
// }
// });




// post validation of home search page

router.post("/search", (req, res) => {

  const errors = [];

  if (req.body.where == "") {
    errors.push("Must enter a place where you want");

  }

  if (req.body.Arrive == "") {
    errors.push("Must enter Arrive date")
  }

  if (req.body.Depart == "") {
    errors.push("Must enter Departure date")
  }
  if (req.body.guests == "") {
    errors.push("Must enter number of guests")
  }

  if (errors.length > 0) {
    res.render("room-listing", {
      messages: errors
    })
  }
});





//Registration page validation//
router.get("/Validation", (req, res) => {
  res.render("Registration", {
    title: "SMS Page"
  });
});

router.post("/Validation", (req, res) => {

  const errors = [];

  if (req.body.fname == "") {
    errors.push("Please Enter your firstname.");
  }
  if (req.body.lname == "") {
    errors.push("Please Enter your lastname.");
  }
  if (req.body.email == "") {
    errors.push("Please Enter your email address.");
  }
  if (req.body.phone == "") {
    errors.push("Please Enter your Phone Number.");
  }
  if (req.body.pswd == "") {
    errors.push("Please Enter your password.");
  }
  else if (req.body.pswd.length < 9) {
    errors.push("Password should be of minimum  8 characters");
  }

  if (errors.length > 0) {
    res.render("Registration", {
      messages: errors
    })
  }

  else {

    const newUser = {

      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      pswd: req.body.pswd
    }

    const user = new userModel(newUser);

    user.save()

      .then(() => {
        console.log("User created in the database");
      })

      .catch(error => console.log(`Error While creating the user ${error}`))


    //Send Message , once user register
    const accountSid = process.env.TWILIO_AUTHID;
    const authToken = process.env.TWILIO_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${req.body.email}`,
      from: `bhawansidhu2@gmail.com`,
      subject: 'Welcome to Airbnb',
      text: 'Hello, How are you ? ',
      html: `Visiter's Full Name ${req.body.fname} ${req.body.lname}<br>
      Visiter's Email Address ${req.body.email}`,
    };

    sgMail.send(msg)
      .then(() => {
        res.redirect("dash");
      })
      .catch((err) => {
        console.log(err);
      }),

      client.messages
        .create({
          body: `${req.body.fname} ${req.body.lname} Email :${req.body.email}`,
          from: '+12065678156',
          to: `${req.body.phone}`
        })
        .then(messages => {
          console.log(messages.sid);
          res.render("home");
        })
        .catch((err) => {
          console.log(err);
        })
  }
});

// Room images Route

router.get("/room_image/:id", (req, res) => {

  adminModel.findById(req.params.id)
    .then((user) => {

      const { roomImage } = user;

      res.render("../views/dashboards/AdminDash", {
        roomImage
      }
      )
    })

    .catch(err => console.log(`Error displaying rooms from the database ${err}`));
})

/***************** LOGOUT Route ***********/

router.get("/logout", (req, res) => {

  req.session.destroy();
  res.redirect("/login")
})


module.exports = router;
