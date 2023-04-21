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
module.exports.delete = function(req,res){
    Post.findById(req.params.id)
    .then((post)=>{
        if(post.user == req.user.id){
            Post.deleteOne(post)
            .catch((err)=>{
                console.log('error in deleting the post(inside the post_controller.js) :',err); 
            })
            Comment.deleteMany({'post':req.params.id})
            .catch((err)=>{
                console.log('error deleting the comments :',err);
            })
        }
        
        
        
    })
    return res.redirect('back');
}