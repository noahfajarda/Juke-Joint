const addTrackCommentEl = document.querySelector("#add-track-comment");

async function addTrackComment(event) {
    event.preventDefault();
    const commentText = document.querySelector("#comment-box").value;
    const userId = document.querySelector("#user-Id").textContent;
    const trackName = document.querySelector("#track-name").textContent;
    const trackArtist = document.querySelector("#track-artist").textContent;
    const searchedItem = `${trackName} ${trackArtist}`;

    if (commentText == "") {
        return;
    }

    // POST to "/api/comment"
    const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({
            body: commentText,
            searchedItem,
            userId,
            type: "Track",
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.replace(`/track/${searchedItem}`);
    } else {
        alert(response.statusText);
    }
}

addTrackCommentEl.addEventListener("click", addTrackComment);