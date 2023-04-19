const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    //refrence of the user to whome this comment is blonged or which user commented
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //refrence of the post on which this comment is commented
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
},{
    timestamps : true
})
//now we need to tell mongoose the comment is a collection/model named Comment
const Comment = mongoose.model('Comment',commentSchema);
// now we need to export this model
module.exports = Comment;