const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//i used this schema for the room listing
const userSchema = new Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    type: {
        type: String,
        default: "New"
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    createdBy: {

    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;