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
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        cmnt : cmnt,
                        flash : "Comment is added successfully",
                        name : req.user.name
                    }
                })
            }
            req.flash('success',' Comment is added successfully');
            return res.redirect('back');
        })
        .catch((error)=>{
            console.log('error occured in posting the comment :',error);
            return res.redirect('back')
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
            if(req.xhr){
                return res.status(200).json({
                    data :{
                        flash : "Comment is Deleted Successfully!",
                        commentid : req.params.id
                    }
                    
                })
            }
            req.flash('success',' Comment is deleted successfully');
            return res.redirect('back');
        }
        
    })
    .catch((error)=>{
        console.log('error occured in finding the comment and deleting it :',error);
        return res.redirect('back');
    })
}