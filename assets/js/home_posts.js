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
        let newPost = newPostDOM(data.data.post);
        $("#post-list-container > ul").prepend(newPost);
        attachDeletePostListener(newPost);
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

let attachDeletePostListener = function (post) {
  let deletePostButton = post.find(".delete-post-button");
  deletePostButton.click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: $(this).prop("href"),
      success: function (data) {
        $(`#post-${data.data.post_id}`).remove();
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  });
};

createPost();