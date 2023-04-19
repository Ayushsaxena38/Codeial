const mongoose = require('mongoose');

const postScheme = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // include the array of ids of all comments in this post Schema itself
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
},{
    timestamps : true
})

const Post = mongoose.model('Post',postScheme);

module.exports = Post;