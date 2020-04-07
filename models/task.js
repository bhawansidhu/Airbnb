const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const taskSchema = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pswd: {
        type: String,
        required: true
    }

});
taskSchema.pre("save", function(next) {
    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(this.pswd, salt)
                .then((encryptpswd) => {
                    this.pswd = encryptpswd
                    next();
                })
                .catch(err => console.log(`error in encrypt password from hashing database : ${err}`));
        })
        .catch(err => console.log(`error in encrypt password from database : ${err}`));



})
const taskModel = mongoose.model('Airbnb', taskSchema);
module.exports = taskModel;