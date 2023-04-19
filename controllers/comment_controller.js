const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.addComment = function(req,res){
    Post.findById(req.body.post)
    .then((post)=>{
        Comment.create({
            'content' : req.body.content,
            'user' : req.user._id,
            'post' : req.body.post
        })
        .then((cmnt)=>{
            post.comments.push(cmnt);
            post.save();
            console.log('done',cmnt);
            return res.redirect('back');
        })
    })
}