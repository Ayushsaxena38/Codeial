module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user2',24);
    res.cookie('userID','none');
    return res.render('home',{
        title : "home"
    });
}
module.exports.about = function(req,res){
    return res.render('about',{
        title : "About"
    });
}