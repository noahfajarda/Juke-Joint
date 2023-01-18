const addTrackCommentEl = document.querySelector("#add-track-comment");
console.log("test");

async function addTrackComment(event) {
    event.preventDefault();
    const commentText = document.querySelector("#comment-box").value;
    const userId = document.querySelector("#user-Id").textContent;
    const trackName = document.querySelector("#track-name").textContent;
    const trackArtist = document.querySelector("#track-artist").textContent;

    if (commentText == "") {
        console.log("there's nothing in here!!");
        return;
    }

    const searchedItem = `${trackName} ${trackArtist}`;

    // POST to "/api/post"
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
