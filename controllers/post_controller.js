const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(req,res){
    console.log(req.body);
    try{
        let post = await Post.create({
            "content" : req.body.content,
            "user" : req.user._id
        });
        console.log(post);
        console.log('Content is Posted');
    }catch(err){
        console.log('error in creating the post, err : ',err);
    }
    // Post.create({
    //     "content" : req.body.content,
    //     "user" : req.user._id
    // })
    // .then((result)=>{
    //     console.log(result);
    //     console.log('Content is Posted');
    // })
    return res.redirect('back');
}
module.exports.addComment = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        try{
            let cmnt = await Comment.create({
                'content' : req.body.content,
                'user' : req.user._id,
                'post' : req.body.post
            });
            post.comments.push(cmnt);
            post.save();
            console.log('done',cmnt);
            return res.redirect('back');
        }catch(err){
            console.log('error in creating the comment, err: ',err);
            return res.redirect('/');
        }
    }catch(err){
        console.log('error in getting the post, err: ',err);
        return res.redirect('/');
    }
    // Post.findById(req.body.post)
    // .then((post)=>{
    //     Comment.create({
    //         'content' : req.body.content,
    //         'user' : req.user._id,
    //         'post' : req.body.post
    //     })
    //     .then((cmnt)=>{
    //         post.comments.push(cmnt);
    //         post.save();
    //         console.log('done',cmnt);
    //         return res.redirect('back');
    //     })
    // })
}
module.exports.delete = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            try{
                let deleteresult = await Post.deleteOne(post);
                console.log('deleted with delete result :',deleteresult);
            }catch(err){
                console.log('error in deleting the post, error :',err);
            }
        }
    }catch(err){
        console.log('error in finding the post ,error :',err);
    }
    // Post.findById(req.params.id)
    // .then((post)=>{
    //     if(post.user == req.user.id){
    //         Post.deleteOne(post)
    //         .catch((err)=>{
    //             console.log('error in deleting the post(inside the post_controller.js) :',err); 
    //         })
    //         Comment.deleteMany({'post':req.params.id})
    //         .catch((err)=>{
    //             console.log('error deleting the comments :',err);
    //         })
    //     }
        
        
        
    // })
    return res.redirect('back');
}