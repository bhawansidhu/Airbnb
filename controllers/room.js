const express = require('express')
const router = express.Router();
const adminModel = require("../models/adminRooms");
const path = require("path");
const roomModel = require("../models/room");
const LoggedIn = require("../middleware/auth");
const AdminorUser = require("../middleware/authorization")

//This allows express to make my static content avialable from the public
router.use(express.static('static'));

//show all products

router.get("/room-listing", (req, res) => {

    res.render("room-listing", {
      title: "Room Listing",
      headingInfo: "Room Listing Page",
      room : roomModel.getallRooms()
    })
  
  });

 router.get("/admin_dash",LoggedIn,AdminorUser,(req,res)=>{
res.render("../views/dashboards/AdminDash")
})

router.get("/create_rooms",(req,res)=>{
    res.render("../views/room_data/createRoom")
})

router.post("/create_rooms",(req,res)=>{

    const newRoom = {
        Title:req.body.title,
        Price: req.body.price,
        Description: req.body.description,
        Location: req.body.location,
        FeaturedRoom:req.body.ftrd_rm,

    };

    const user = new adminModel(newRoom);

    user.save()
    .then((user)=>{
        req.files.roomImage.name = `room_image_${user._id}${path.parse(req.files.roomImage.name).ext}`;
        req.files.roomImage.mv(`/room_images/${req.files.roomImage.name}`)
        .then(()=>{

            adminModel.updateOne({_id:user._id},
                {
                    roomImage:req.files.roomImage.name
                })
            
                .then(()=>{
                    res.redirect(`/room-listing/room_image/${user._id}`);
                })
        })
    })

    .catch(err=>console.log(`An error while creating the rooms ${err}`));

});

// here is the Route to view rooms 

router.get("/view_rooms",(req,res)=>{

    adminModel.find()

    .then((records)=>{

        const rooms_data = records.map(record =>{
            
            return {
                id:record._id,
                title:record.title,
                price:record.price,
                description:record.description,
                location:record.location,
                FeaturedRoom:record.FeaturedRoom,
                roomImage:record.roomImage
                
            }
        })

        res.render("../views/room_data/viewRooms",{
            rooms:rooms_data,
        });

    })

    .catch(err=>console.log(`Error occured while displaying the data ${err}`))

})

// here I used Route to edit rooms

router.get("/edit_rooms/:id",(req,res)=>{

    adminModel.findById(req.params.id)

    .then((task)=>{

        const {_id,title,price,description,location,FeaturedRoom} = task;

        res.render("../views/room_data/updateRooms",{

            _id,
            title,
            price,
            description,
            location,
            FeaturedRoom
        });
    })

    .catch(err=>console.log(`Error occured when pulling into the database ${err}`));
})

// Route to update Rooms 

router.put("/updateRooms/:id",(req,res)=>{

    const task = {
        Title:req.body.title,
        Description:req.body.description,
        Price:req.body.price,
        Location:req.body.location,
        FeaturedRoom:req.body.ftrd_rm
    }

    adminModel.updateOne({_id:req.params.id},task)

    .then(()=>{
        res.redirect("/room-listing/view_rooms")
    })

    .catch(err=>console.log(`Error occured when pulling into the database ${err}`));

})

// Route to delete rooms

router.delete("/delete/:id",(req,res)=>{

    adminModel.deleteOne({_id:req.params.id})
    
    .then(()=>{
        res.redirect("/room-listing/view_rooms");
    })

    .catch(err=>console.log(`Error occured while deleting the record ${err}`));

})




router.get('/room_images/:id',(req,res)=>{

    adminModel.findById(req.params.id)
    .then((user)=>{

        const {roomImage} = user;

        res.render("room_data/viewRoomTwo",{

            roomImage
        });
    })

    .catch(err=>{console.log("error occured when loading the image")})
})

module.exports = router;


 