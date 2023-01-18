const addArtistCommentEl = document.querySelector("#add-artist-comment");

async function addArtistComment(event) {
    event.preventDefault();
    const commentText = document.querySelector("#comment-box").value;
    const userId = document.querySelector("#user-Id").textContent;
    const artistName = document.querySelector("#artist-name").textContent;

    if (commentText == "") {
        console.log("there's nothing in here!!");
        return;
    }

    console.log(commentText);
    console.log(userId);
    console.log(artistName);

    // POST to "/api/post"
    const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({
            searchedItem: artistName,
            body: commentText,
            userId,
            type: "Artist",
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.replace(`/artist/${artistName}`);
    } else {
        alert(response.statusText);
    }
}

addArtistCommentEl.addEventListener("click", addArtistComment);
