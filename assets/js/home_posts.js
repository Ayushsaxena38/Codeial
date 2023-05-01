{
    //method to submit the form data for the new post using AJAX
    let createPost = function(){
        let postForm = $('#postForm');
        postForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                url : '/posts/create',
                method : 'POST',
                data : postForm.serialize(),
                success : function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data,data.name);
                    $('#post-list').prepend(newPost);
                    $('#content').val('');
                    //notification center for ajax
                        if(data.flash.success && data.flash.success.length > 0) {
                            new Noty({
                                theme : 'relax',
                                text: `${data.flash.success}`,
                                type : 'success',//<-- this is a color theme type
                                layout : 'topRight',//<-- this defines where the notification will come in the screen
                                timeout : 1500
                            }).show();
                        }
                        deletePost();
                },
                error : function(error){
                    console.log('erorr : ',error.responseText);
                }
            })
        })
        
    }

    //method to create a post and then append it into the DOM
    let newPostDom = function(post,name){
        return $(`<li id = 'post-${post._id}'>
                    <div id="userName-PostContent">
                        <div class="userPosted">
                            <p>${name}</p>
                        </div>
                            <a href="/posts/delete/${post._id}" id = "delete-post" postid = "${post._id}"><button>Delete</button></a>
                        <div id="postContent">
                            <p>${post.content}</p>
                            <br>
                            
                            
                            <div id="addComment">
                                <form action="/comments/addComment" method="post">
                                    <input type="text" name = 'content' placeholder="Add Comment....">
                                    <input id ="hidden" type="text" name="post" value = '${post._id}' >
                                    <input type="submit" value="Comment">
                                </form>
                            </div>
                            <div id="showComments">
                                <h3 class = "section-title">Comments</h3>
                                    <div>
                                        <p style="text-align: center">NO Comments</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`)
    }

    //function to delete post via AJAX and delete the post in the list too
    function deletePost(){
        let delBtn = $('#delete-post');
        delBtn.click(function(event){
            event.preventDefault();
            // console.log($(event.target).prop('href'));
            console.log($(event.currentTarget));
            console.log($(event.currentTarget).prop('href'));
            let targetUrl = $(event.currentTarget).prop('href');
            let targetPost = $(event.currentTarget).prop('postid');
            // ajax request
            $.ajax({
                url : targetUrl,
                method : 'get',
                data : targetPost,
                success : function(data){
                    console.log(data);
                    console.log('success',data.data.result);
                    console.log('post-',data.data.postid);
                    $(`#post-${data.data.postid}`).remove();
                    //show notification
                    if(data.data.flash && data.data.flash.length > 0) {
                        new Noty({
                            theme : 'relax',
                            text: `${data.data.flash}`,
                            type : 'success',//<-- this is a color theme type
                            layout : 'topRight',//<-- this defines where the notification will come in the screen
                            timeout : 1500
                        }).show();
                    }

                },error : function(error){
                    console.log('error',error);
                }
            })
        })
    }
    deletePost();



    createPost();
}