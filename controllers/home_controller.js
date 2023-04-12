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