const passport = require('passport');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(req,res){
    console.log(req.body);
    try{
        let post = await Post.create({
            "content" : req.body.content,
            "user" : req.user._id
        });

        console.log(post);
        
        if(req.xhr){
            return res.status(200).json({
                data : post,
                message : 'Post is Created!!',
                name : res.locals.user.name,
                flash : {
                    'success' : 'Post is Created successfully'
                }
            });
        }
    }catch(err){
        req.flash('error','Post is not Created dur to error');
        console.log('error in creating the post, err : ',err);
    }
    // Post.create({
    //     "content" : req.body.content,
    //     "user" : req.user._id
    // })
    // .then((result)=>{
    //     console.log(result);
    //     console.log('Content is Posted');
    // })
    console.log('Content is Posted');
    req.flash('success','Post is Created successfully')
    return res.redirect('back');
}
module.exports.addComment = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        try{
            let cmnt = await Comment.create({
                'content' : req.body.content,
                'user' : req.user._id,
                'post' : req.body.post
            });
            post.comments.push(cmnt);
            post.save();
            console.log('done',cmnt);
            return res.redirect('back');
        }catch(err){
            console.log('error in creating the comment, err: ',err);
            return res.redirect('/');
        }
    }catch(err){
        console.log('error in getting the post, err: ',err);
        return res.redirect('/');
    }
    // Post.findById(req.body.post)
    // .then((post)=>{
    //     Comment.create({
    //         'content' : req.body.content,
    //         'user' : req.user._id,
    //         'post' : req.body.post
    //     })
    //     .then((cmnt)=>{
    //         post.comments.push(cmnt);
    //         post.save();
    //         console.log('done',cmnt);
    //         return res.redirect('back');
    //     })
    // })
}
module.exports.delete = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            try{
                let deleteresult = await Post.deleteOne(post);
                console.log('deleted with delete result :',deleteresult);
                try{
                    await Comment.deleteMany({'post':req.params.id})
                }catch(err){
                    console.log('erorr in deleting the comments',err);
                }
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            result : deleteresult,
                            postid : req.params.id,
                            flash : "Post is Deleted with associated comments"
                        }
                    })
                }
                req.flash('success','Post is Deleted with associated comments');
            }catch(err){
                req.flash('error','Post is NOT Deleted due to error');
                console.log('error in deleting the post, error :',err);
            }
        }
    }catch(err){
        req.flash('error','Post is NOT Deleted due to error in finding');
        console.log('error in finding the post ,error :',err);
    }
    // Post.findById(req.params.id)
    // .then((post)=>{
    //     if(post.user == req.user.id){
    //         Post.deleteOne(post)
    //         .catch((err)=>{
    //             console.log('error in deleting the post(inside the post_controller.js) :',err); 
    //         })
    //         Comment.deleteMany({'post':req.params.id})
    //         .catch((err)=>{
    //             console.log('error deleting the comments :',err);
    //         })
    //     }
        
        
        
    // })
    return res.redirect('back');
}