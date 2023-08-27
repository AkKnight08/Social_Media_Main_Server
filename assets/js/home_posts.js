{

  function createPost() {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log("Post created");
          let newpost= newPostDOM(data.data.post);
          $("#post-list-container > ul").prepend(newpost);
          deletePost($(".delete-post-button",newpost));
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  }

  let newPostDOM = function (post) {
    let html = `
    <li id="post-${post._id}">
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
      </small>
      ${post.content}
      <small style="color: blueviolet;"> ${post.user.name} </small>
      <div class="post-comments">
        <form action="/comments/create" method="POST">
          <input
            type="text"
            name="content"
            placeholder="Write your comment for the post here"
            required
          />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="Add comment" />
        </form>
        <ul id="post-comments-${post._id}">
        </ul>
      </div>
    </li>`;

    return $(html);
  };

 let deletePost = function (deletelink) {
   $(deletelink).click(function (e) {
     e.preventDefault();
     let postID = $(this).data("post-id"); // Get the post ID from data attribute

     $.ajax({
       type: "GET",
       url: $(this).prop("href"),
       success: function (data) {
         $(`#post-${data.data.post_id}`).remove(); // Use # before post ID in selector
       },
       error: function (err) {
         console.log(err.responseText);
       },
     });
   });
 };


  createPost();
}
