const passport = require('passport');
const Post = require('../models/post');

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