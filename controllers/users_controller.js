
const User = require('../models/user');

module.exports.profile = function(req,res){
    res.end(`<h1>User Profile</h1>`);
}
module.exports.login = function (req,res){
    return res.render('login',{
        title : 'login page'
    });
}
module.exports.signup = function (req,res){
    return res.render('signup',{
        title : 'SignUp page'
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
module.exports.profile = function(req,res){
    
    User.findOne({
        "email" : req.body.email,
        "password" : req.body.password
    })
    .then((result)=>{
        // console.log(result);
        // console.log(result.name);
        if(result){
            return res.render('profile',{
            title : "profile page",
            user : result
        })
        }else{
            return res.redirect('back');
        }
        
    })
}
