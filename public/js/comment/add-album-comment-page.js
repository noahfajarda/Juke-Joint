const addAlbumCommentEl = document.querySelector("#add-album-comment");

async function addAlbumComment(event) {
    event.preventDefault();
    const commentText = document.querySelector("#comment-box").value;
    const userId = document.querySelector("#user-Id").textContent;
    const albumName = document.querySelector("#album-name").textContent;
    const albumArtist = document.querySelector("#album-artist").textContent;

    if (commentText == "") {
        console.log("there's nothing in here!!");
        return;
    }

    const searchedItem = `${albumName} ${albumArtist}`;

    // POST to "/api/post"
    const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({
            body: commentText,
            searchedItem,
            userId,
            type: "Album",
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.replace(`/album/${searchedItem}`);
    } else {
        alert(response.statusText);
    }
}

addAlbumCommentEl.addEventListener("click", addAlbumComment);
