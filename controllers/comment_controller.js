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
            req.flash('success',' Comment is added successfully');
            return res.redirect('back');
        })
    })
}
module.exports.delete = function(req,res){
    console.log(req.params.id);
    Comment.findById(req.params.id)
    .then((cmnt)=>{
        if(req.user.id == cmnt.user){
            let postId=cmnt.post;
            Comment.deleteOne(cmnt)
            .catch((err)=>{
                console.log('error in deleting the comment err :',err);
            })
            Post.findByIdAndUpdate(postId, { $pull : {"comments": req.params.id}})
            .then((p1)=>{
                console.log('post is updated : ',p1);
            })
            //another way of updating the post
            // Post.findById(postId)
            // .then((post)=>{
            //     post.comments.pull(req.params.id);
            //     post.save();
            // })
            console.log('deleted');
            req.flash('success',' Comment is deleted successfully');
            res.redirect('back');
        }
    })
}