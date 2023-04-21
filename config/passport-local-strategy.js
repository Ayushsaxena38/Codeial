const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
},function(email,password,done){
    //find a user and establish the identity
    User.findOne({email : email})
    .then((user)=>{
        if(!user || user.password !== password){
            console.log('Invalid Username/password');
            return done(null,false);
        }
        return done(null,user);
    })
    .catch((err)=>{
        console.log('error finding the user --> Passport');
        return done(err);
    });

}));

//serialazing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user to from the key in the cookies
passport.deserializeUser(function(id , done){
    //find the user by the id which is present in the cookie
    User.findById(id)
    .then((user)=>{
        return done(null,user);
    })
    .catch((err)=>{
        console.log('error in finding the user --> Passport');
        return done(err);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){ //<-- this function is a middleware
    //if the user is signed in then pass on the request to the next() function which is controller's action
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('back');
}

passport.checkAuthenticationFeed = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('home',{
        title : "Codeial/Home"
    })
}

passport.setAuthenticatedUser = function(req,res,next){//<--this middleware which i create , is just taking the user details and put the user details to locals.user so the profile.ejs file can access it
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    //if the request is not authenticated which means user is not logged in then move controll to next()
    return next();
}

// in the end we have to export the passport so we can use it anywhere else
module.exports = passport;