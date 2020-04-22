const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// here is the schema for room listing. 
const roomSchema = new Schema(
    {
        title: {
            type: String,
           
        },
        description: {
            type: String,
           
        },
        price: {
            type: Number,
            
        },
        location: {
            type: String,
           
        },
        type: {
            type: String,
            default: "Regular"
        },
        
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        roomImage:
        {
            type:String
        },
        createdBy: {

        }
    });

const adminModel = mongoose.model('Admin Room', roomSchema);
module.exports = adminModel;