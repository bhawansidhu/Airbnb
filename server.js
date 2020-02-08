const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express();


//This allows express to make my static content avialable from the public
app.use(express.static('public'));

//This tells Express to set or register Handlebars as its' Template/View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render("homepage", {
    title: "Home",
    headingInfo: "HOME PAGE"
  })
});

app.get('/register', function (req, res) {
  res.render("register", {
    title: "User Registration",
    headingInfo: "register now",
  })
});


app.get("/room-listing",(req,res)=>{

  res.render("roomListing",{
      title: "Room Lsting",
      headingInfo : "Room Lsting Page",
  })

  });




const PORT = 3000;
app.listen(3000, () => {
  console.log("web server is running");
})