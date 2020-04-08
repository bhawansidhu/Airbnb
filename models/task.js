const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// here is the schema for room listing. 
const taskSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    type: {
        type: String,
        default: "Regular"
    },
    photo: {
        type: String,
        require: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    createdBy: {

    }
});

const taskModel = mongoose.model('Room', taskSchema);
module.exports = taskModel;