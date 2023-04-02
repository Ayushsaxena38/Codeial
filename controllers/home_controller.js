module.exports.home = function(req,res){
    res.end(`<h1>Express is Up and ready for codeial!</h1>`);
}
module.exports.about = function(req,res){
    res.end('<h1>About Section</h1>');
}