const passport = require('passport');
const JwtPassport = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JwtPassport(opts , function(jwtPayload , done){
    User.findById(jwtPayload._id)
    .then((user)=>{
        if(!user){
            return done(null,false);
        }
        return done(null , user);
    })
    .catch((err)=>{
        return done(err);
    })
}));

module.exports = passport;