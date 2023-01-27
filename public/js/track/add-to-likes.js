async function addToLikes(e) {
    e.preventDefault();
    const trackName = document.querySelector("#track-name").textContent;
    const trackArtist = document.querySelector("#track-artist").textContent;
    const trackArt = document.querySelector("#track-art").textContent;
    const trackId = document.querySelector("#trackId").textContent;
    const userId = document.querySelector("#user-Id").textContent;

    const song = {
        trackName,
        trackArtist,
        trackArt,
        trackId,
        userId
    };

    const response = await fetch("/api/likes/add", {
        method: "POST",
        body: JSON.stringify(song),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        console.log("Song added to likes!");
    } else {
        console.log("Error adding song to likes!");
    }
}

async function removeFromLikes(e) {
    e.preventDefault();
    const trackId = document.querySelector("#trackId").textContent;

    const response = await fetch("/api/likes/remove", {
        method: "POST",
        body: JSON.stringify({trackId}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        console.log("Song removed from likes!");
    } else {
        console.log("Error removing song to likes!");
    }
}



// account for the heart button
let bool = false;
document.querySelector("#addToLikes").addEventListener("click", (e) => {
    if (!bool) {
        document.querySelector(".heart").classList.add("is-active")
        addToLikes(e)
        bool = true;
    } else {
        document.querySelector(".heart").classList.remove("is-active")
        removeFromLikes(e)
        bool = false;
    }
})

// check if the user already liked the song
checkecLikedSong();

async function checkecLikedSong() {
    const trackId = document.querySelector("#trackId").textContent;
    const userId = document.querySelector("#user-Id").textContent;

    const response = await fetch("/api/likes/checkLike", {
        method: "POST",
        body: JSON.stringify({trackId, userId}),
        headers: {
            "Content-Type": "application/json",
        },
    });
    

    if (response.ok) {
        document.querySelector(".heart").classList.add("is-active")
        bool = true;
    } else {
        console.log("Error removing song to likes!");
    }
}
