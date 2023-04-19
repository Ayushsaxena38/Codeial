const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function(req,res){
    console.log(req.body);
    Post.create({
        "content" : req.body.content,
        "user" : req.user._id
    })
    .then((result)=>{
        console.log(result);
        console.log('Content is Posted');
    })
    res.redirect('back');
}
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