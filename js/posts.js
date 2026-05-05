let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = users.find(user => user.current === true);


if (!currentUser.posts) {
    currentUser.posts = { liked: [], disliked: [] };
}

let likedPosts = currentUser.posts.liked;
let dislikedPosts = currentUser.posts.disliked;

document.querySelectorAll(".post-card").forEach(post => {
    const postId = post.id;
    const likeBtn = post.querySelector(".like-btn");
    const dislikeBtn = post.querySelector(".dislike-btn");

    const likeIcon = likeBtn.querySelector("i");
    const dislikeIcon = dislikeBtn.querySelector("i");

    if (likedPosts.includes(postId)) {
        likeIcon.classList.replace("fa-regular", "fa-solid");
    }
    if (dislikedPosts.includes(postId)) {
        dislikeIcon.classList.replace("fa-regular", "fa-solid");
    }

    likeBtn.addEventListener("click", () => {

        if (likedPosts.includes(postId)) {
            likedPosts = likedPosts.filter(id => id !== postId);
            likeIcon.classList.replace("fa-solid", "fa-regular");
        } else {
            likedPosts.push(postId);
            likeIcon.classList.replace("fa-regular", "fa-solid");

            dislikedPosts = dislikedPosts.filter(id => id !== postId);
            dislikeIcon.classList.replace("fa-solid", "fa-regular");
        }

        currentUser.posts.liked = likedPosts;
        currentUser.posts.disliked = dislikedPosts;

        localStorage.setItem("users", JSON.stringify(users));
    });

    dislikeBtn.addEventListener("click", () => {

        if (dislikedPosts.includes(postId)) {
            dislikedPosts = dislikedPosts.filter(id => id !== postId);
            dislikeIcon.classList.replace("fa-solid", "fa-regular");
        } else {
            dislikedPosts.push(postId);
            dislikeIcon.classList.replace("fa-regular", "fa-solid");

            likedPosts = likedPosts.filter(id => id !== postId);
            likeIcon.classList.replace("fa-solid", "fa-regular");
        }

        currentUser.posts.liked = likedPosts;
        currentUser.posts.disliked = dislikedPosts;

        localStorage.setItem("users", JSON.stringify(users));
    });

});