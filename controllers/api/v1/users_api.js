const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.users = async function(req,res){
    let all_users = await User.find({}).select('-password');
    return res.json(200,{
        message : "confidencial information",
        users : all_users
    });
}
module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({'email' : req.body.email});
        console.log('user is founded but pass is not checked yet');
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : "Invalid Username/Password"
            });
        }
        return res.json(200,{
            message : "Sign In successfully, here is your token , please keep it safe! ",
            token : jwt.sign(user.toJSON() , 'codeial' , {expiresIn : '100000'})
        });
    }catch(err){
        return res.json(500,{
            message : "Server Error",
            error : err
        });
    }
}