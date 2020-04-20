const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
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
        default:"User"
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    createdBy: {

    }
})
userSchema.pre("save",function(next){

    bcrypt.genSalt(10)
    .then((salt)=>{
        bcrypt.hash(this.Pswd,salt)
        
        .then((encryptedPswd)=>{
            this.Pswd=encryptedPswd;
            next();
        })
    })
    .catch(error=>console.log(`Error occured while salting the password ${error}`));
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;