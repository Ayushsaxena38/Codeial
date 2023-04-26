
const User = require('../models/user');
const passport = require('passport');
const Post = require('../models/post');
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
module.exports.create = async function(req,res){
    try{
        let result = await User.findOne({
            "email" : req.body.email
        });
        if(!result){
            try{
                let newuser = await User.create({
                name : req.body.userName,
                email : req.body.email,
                password : req.body.password
                });
                req.flash('success','Successfully Created New User');
                console.log('Successfully created new user ',newuser);
                
            }catch(err){
                req.flash('error','User is Not Created due to some Error');
                console.log('error in creating the new user ',err);
            }
        }
    }catch(err){
        console.log('error in finding the user with given email and name and password :',err);
    }
    return res.redirect('/');
}
module.exports.check = async function(req,res){
    try{
        let result = await User.findOne({email : req.body.email,
        password : req.body.password,
        name : req.body.name});
        res.jsom(result);
    }catch(err){
        console.log('error in finding the user',err);
    }
}
module.exports.loggedIn = function(req,res){
    return res.render('profile',{
        title : "profile page",
        user : req.user
    }) 
}
module.exports.profile = function(req,res){
    console.log(req.flash);
    req.flash('success' , 'Logged In successfully');
    return res.redirect('/users/loggedIn');
}
module.exports.userPage = async function(req,res){
    try{
        let user = await User.findById(req.params.id);
        // req.flash('success' , 'Logged In successfully');
         return res.render('profile',{
            title : "profile page",
            other_user : user
        })
    }catch(err){
        console.log("error in finding that user err: ",err);
        return res.redirect('/');
    }
}
module.exports.deleteSession = function(req,res){
    req.flash('success' , 'Logged Out successfully');
    req.logout((err)=>{
        if(err){
            console.log("this is req.logout ==>",err);
            return next(err);
        }else{
            req.flash('success' , 'Logged Out successfully');
             return res.redirect('/');
        }
        
    })
    
   
}
module.exports.update = async function(req,res){
    console.log(req.body);
    if(req.user.email == req.body.email){
        console.log('user is authenticated');
        try{

            let user = await User.findByIdAndUpdate(req.user.id , req.body);
            req.flash('success','User is Updated Successfully');
            console.log('User is Updated Seccessfully',user);
        }catch(err){
            req.flash('success','User is not Updated due to error');
            console.log('Error in Updating the User',err);
        }
        
    }else{
        console.log('user is not authenticated');
    }
    res.redirect('back');
}
