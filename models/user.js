//first require the mongoose library here
const mongoose = require('mongoose');

//now we need to define the Schema for the user document
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
},{
    timeStamps : true
});

//now take the instance of the Schema to export it
const User = mongoose.model('User',userSchema);

//now export the instance of Schema
module.exports = User;