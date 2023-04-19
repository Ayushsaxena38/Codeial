const Post = require('../models/post');

module.exports.home = function(req,res){
    console.log(req.cookies);
    return res.render('home',{
        title : "home"
    });
}
module.exports.about = function(req,res){
    return res.render('about',{
        title : "About"
    });
}
module.exports.userHome = function(req,res){
    // Post.find({}).populate('user').exac((err,posts)=>{
    //     if(err){
    //         console.log('error fetching the feeds :',err);
    //         return res.redirect('/');
    //     }
    //     return res.render('home',{
    //         title : "user Home",
    //         posts : posts
    //     })
    // })
    // Post.find({}).populate(‘user’).populate({path: ‘comments’, populate: {path: ‘user’}}).exec(); <-- old syntex(depricated syntex)
    Post.find({}).populate('user').populate({path: 'comments', populate: {path : 'user'}})//<-- new syntex***********************
    .then((posts)=>{
        console.log(posts)
        return res.render('home',{
            title : "user Home",
            posts : posts
        })
    })
    .catch((err)=>{
        if(err){
            console.log('error fetching the feeds :',err);
            return res.redirect('/');
        }
    })
}