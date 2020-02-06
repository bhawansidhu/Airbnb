const express = require('express')

const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const app = express()
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render("homepage",{
        title:"Home",
        headingInfo:"HOME PAGE"
    })
  })

  app.get('/register', function (req, res) {
    res.render("register",{
      title:"User Registration",
        headingInfo:"register now",
    })
  })

  app.get('/explore', function (req, res) {
    const places=[];
    places.push(
      {
        imgURL:`/image/cozy house.jpg`,
        title:`One Large Bedroom Apartment`,
        price:`CAD $150 avg/night`
      });


      places.push(
        {
          imgURL:`/image/bedroom.jpg`,
          title:` One Beautiful and Large bedroom `,
          price: `CAD $120 avg/night`
  
        });



        places.push(
          {
            imgURL:`/image/house.jpg`,
            title:` Luxurious One Bedroom Apartment`,
            price: `CAD $200 avg/night`
          });


        
          places.push(
            {
              imgURL:`/image/big apartment.jpg`,
              title:`Large and Beautiful One Bedroom Apartment`,
              price: `CAD $240 avg/night`
            });

        
            places.push(
              {
                imgURL:`/img/cover.jpg`,
                title:`titleeeewww`,
                price:100,
                rating:3
        
              });
        
              places.push(
                {
                  imgURL:`/img/cover.jpg`,
                  title:`titleeeewww`,
                  price:100,
                  rating:3
          
                });
                
    res.render("explore",{
      title:"List of properties",
        headingInfo:"Properties ready to rent",
        rooms:places
    })
  })



  const PORT =3000;
  app.listen(3000,()=>{
      console.log("webserver connected");
  })