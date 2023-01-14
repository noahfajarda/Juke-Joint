const addCommentEl = document.querySelector("#add-comment");
const commentTextEl = document.querySelector("#comment-box");
const userIdEl = document.querySelector("#user-Id");
const trackNameEl = document.querySelector("#track-name");

async function addComment(event) {
    event.preventDefault();
    if (commentTextEl.value == "") {
        console.log("there's nothing in here!!");
        return;
    }

    const userId = userIdEl.textContent;
    const trackName = trackNameEl.textContent;
    const body = commentTextEl.value;

    // POST to "/api/post"
    const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({
            body,
            searchedItem: trackName,
            userId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        document.location.replace(`/track/${trackName}`);
    } else {
        alert(response.statusText);
    }
}

addCommentEl.addEventListener("click", addComment);
