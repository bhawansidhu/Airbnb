const express = require('express')
const router = express.Router();

const roomModel = require("../models/room");
const taskModel = require("../models/task");
//const adminmodel = require("../models/admin");

//This allows express to make my static content avialable from the public
router.use(express.static('static'));
router.use(bodyParser.urlencoded({ extended: false }))

router.use((req, res, next) => {
    if (req.query.method == "PUT") {
        req.method = "PUT"
    } else if (req.query.method == "DELETE") {
        req.method = "DELETE"
    }
    next();
})

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

  res.render("RoomList", {
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
  })

});

router.get("/admin", (req, res) => {

  res.render("admin", {
      title: "Admin page",
      headingInfo: "Admin Page",
  });
});

router.get("/dashboard", (req, res) => {

  taskModel.find()
      .then((store) => {

          const filtertask = store.map(result => {

              return {

                  fName: result.fName,
                  lName: result.lName,
                  phone: result.phone,
                  email: result.email
              }
          });
          res.render("adminedit", {
              data: filtertask
          })
      })

  .catch(err => console.log(`error in pulling database : ${err}`));
});


 //router.get("/dashboard",(req,res)=>{

 // res.render("dashboard",{
   //   title: "Dashboard Page",
  //    headingInfo : "Dashboard Page"

////  })
//});


//LOGIN PAGE Validation

router.get("/Login-Validation", (req, res) => {
  res.render("login", {
      title: "SMS Page"
  });
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

//Registration page validation
router.get("/Validation", (req, res) => {
  res.render("Registration", {
      title: "SMS Page"
  });
});

router.post("/Validation", (req, res) => {

  const errors = [];

  if (req.body.fname == "") {
    errors.push("Enter your firstname.");
  }
  if (req.body.lname == "") {
    errors.push("Enter your lastname.");
  }
  if (req.body.email == "") {
    errors.push("Enter your email address.");
  }
  if (req.body.phone == "") {
    errors.push("Enter your Phone Number.");
  }
  if (req.body.pswd == "") {
    errors.push("Enter your password.");
  }
  else if (req.body.pswd.length < 6) {
    errors.push("Password should be of minimum  5 characters");
  }

  if (errors.length > 0) {
    res.render("dashboard", {
      messages: errors
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
      to: `${req.body.email}`,
      from: `bhawansidhu2@gmail.com`,
      subject: 'Welcome to Airbnb',
      text: 'Hello, How are you ? ',
     html: `Visiter's Full Name ${req.body.fname} ${req.body.lname}<br>
      Visiter's Email Address ${req.body.email}`,
    };

    sgMail.send(msg)
      .then(() => {
        res.redirect("dashboard");
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
        res.render("dashboard");
      })
      .catch((err) => {
        console.log(err);
      })
  }
});
module.exports = router;
