//first require the mongoose library here
const mongoose = require('mongoose');
//require multer
const multer = require('multer');
//require path
const path = require('path');
const { isArrayBufferView } = require('util/types');
//create the avatars folder a path
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar : {
        type : String
    }
},{
    timeStamps : true
});

//storage details for multer
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname , '..' , AVATAR_PATH));
    },
    filename : function(req,file,cb){
        cb(null , file.fieldname + '-' + Date.now())
    }
})
//static methods 
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

//now take the instance of the Schema to export it
const User = mongoose.model('User',userSchema);

//now export the instance of Schema
module.exports = User;