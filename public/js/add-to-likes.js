document.querySelector("#addToLikes").addEventListener("click", async (e) => {
    e.preventDefault();

    const trackName = document.querySelector("#track-name").textContent;
    const trackArtist = document.querySelector("#track-artist").textContent;
    const song = {
        trackName,
        trackArtist,
    };
    const response = await fetch("/api/likes/", {
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
});
