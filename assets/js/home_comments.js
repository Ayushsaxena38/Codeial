let addComments = function(){
    let addCmntForm = $('#addCommentForm');
    addCmntForm.submit(function(event){
        event.preventDefault();
        console.log('addComemnt is pressed');
        console.log(addCmntForm.serialize());
        //ajax request
        $.ajax({
            url : '/comments/addComment',
            method : 'POST',
            data : addCmntForm.serialize(),
            success : function(data){
                console.log(data);
                let newcmnt = newCmntDom(data.data);
                console.log(newcmnt)
                $('#comments-list').append(newcmnt);
                $('#contentComment').val('');
                //notification
                if(data.data.flash && data.data.flash.length > 0) {
                    new Noty({
                        theme : 'relax',
                        text: `${data.data.flash}`,
                        type : 'success',//<-- this is a color theme type
                        layout : 'topRight',//<-- this defines where the notification will come in the screen
                        timeout : 1500
                    }).show();
                }
                deleteComment();
            },
            error : function(error){
                console.log('error in posting the comment :',error);
            }
        })
    })
}
let newCmntDom = function(data){
    console.log(data.cmnt.content);
    return $(`<li id = 'comment-${data.cmnt._id}'>
                <div>
                    <div class="userPosted">
                        <p>${data.name}</p>
                    </div>

                    <a href='/comments/delete/${data.cmnt._id}' id = "delete-comment" commentid = '${data.cmnt._id}'><button>Delete</button></a>
                    <p>${data.cmnt.content}</p>
                </div>
            </li>`)
}


//function to delete comment via AJAX and delete the comment in the list too
let deleteComment = function (){
    let delBtn = $('#delete-comment');
    delBtn.click(function(event){
        event.preventDefault();
        // console.log($(event.target).prop('href'));
        console.log($(event.currentTarget));
        console.log($(event.currentTarget).prop('href'));
        let targetUrl = $(event.currentTarget).prop('href');
        let targetPost = $(event.currentTarget).prop('commentid');
        // ajax request
        $.ajax({
            url : targetUrl,
            method : 'get',
            data : targetPost,
            success : function(data){
                console.log(data);
                $(`#comment-${data.data.commentid}`).remove();
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
deleteComment();

addComments();