const Post = require('../models/post');
const User = require('../models/user');
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
module.exports.userHome = async function(req,res){
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
    // Post.find({}).populate('user').populate({path: 'comments', populate: {path : 'user'}})//<-- new syntex***********************
    // .then((posts)=>{
    //     User.find({})
    //     .then((all_users)=>{
    //     return res.render('home',{
    //             title : "user Home",
    //             posts : posts,
    //             all_users : all_users
    //         })
    //     })
    //     // console.log(posts)
        
    // })
    // .catch((err)=>{
    //     if(err){
    //         console.log('error fetching the feeds :',err);
    //         return res.redirect('/');
    //     }
    // })
    //use try catch syntex for the promices
    try{
        let posts = await Post.find({}).populate('user').populate({path: 'comments', populate: {path : 'user'}});
        try{
            let all_users = await User.find({});
            return res.render('home',{
                title : "user Home",
                posts : posts,
                all_users : all_users
            })
        }catch(err){
            console.log('error fetching the feeds :',err);
            return res.redirect('/');
        }
        
        
    }catch(err){
        console.log('error fetching the feeds :',err);
        return res.redirect('/');
    }
}