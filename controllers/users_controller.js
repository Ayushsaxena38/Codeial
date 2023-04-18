
const User = require('../models/user');
const passport = require('passport');
const Post = require('../models/post');
module.exports.profile = function(req,res){
    res.end(`<h1>User Profile</h1>`);
}
module.exports.login = function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/userPage');
    }
    console.log(res.locals);
    return res.render('login',{
        title : 'login page'
    });
}
module.exports.signup = function (req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/userPage');
    }
    return res.render('signup',{
        title : "sign-up page"
    })
}
module.exports.create = function(req,res){
    User.findOne({
        "email" : req.body.email
    })
    .then((result)=>{
        if(!result){
           User.create({
            name : req.body.userName,
            email : req.body.email,
            password : req.body.password
        })
        .then((result)=>{
            console.log(result);
            res.render('home',{
                title : 'home'
            });
        }) 
        }else{
            return res.render('signup',{
                title: "user already exists"
            });
        }
    })
    
}
module.exports.check = function(req,res){
    User.findOne({email : req.body.email,
    password : req.body.password,
name : req.body.name})
.then((result)=>{
    const a = result;
    res.json(a);
})
}
module.exports.profile = function(req,res){
    return res.redirect('/users/userPage');
}
module.exports.userPage = function(req,res){
    return res.render('profile',{
        title : "profile page",
        user : res.locals.user
    })
}
module.exports.deleteSession = function(req,res){
    req.logout((err,)=>{
        if(err){
            console.log("this is req.logout ==>",err);
        }
        
    })
    
    return res.redirect('/');
}

