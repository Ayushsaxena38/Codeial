const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    try{
        let posts = await Post.find({}).sort('-createdAt').populate({path : 'user', select : '-password'}).populate({path: 'comments', populate: {path : 'user',select : '-password'}});
        return res.json(200,{
            message : 'all the posts',
            posts : posts
        })
    }catch(err){
        console.log('error fetching the feeds :',err);
        return res.redirect('/');
    }

}

module.exports.delete = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        // if(post.user == req.user.id){
            try{
                let deleteresult = await Post.deleteOne(post);
                console.log('deleted with delete result :',deleteresult);
                try{
                    await Comment.deleteMany({'post':req.params.id})
                    return res.json(200,{
                        message : 'post is deleted with associated comments',
                        deleteresult : deleteresult
                    })
                }catch(err){
                    console.log('erorr in deleting the comments',err);
                }
                
                
            }catch(err){
                // req.flash('error','Post is NOT Deleted due to error');
                console.log('error in deleting the post, error :',err);
            }
        // }
    }catch(err){
        // req.flash('error','Post is NOT Deleted due to error in finding');
        console.log('error in finding the post ,error :',err);
    }
    return res.redirect('back');
}
        
    

    