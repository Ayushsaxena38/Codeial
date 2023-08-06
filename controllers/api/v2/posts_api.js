module.exports.index = function(req,res){
    return res.json(200,{
        message : "this is coming from v2",
        posts : []
    })
}