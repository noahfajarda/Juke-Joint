document
    .querySelector("#addToPlaylist")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const trackName = document.querySelector("#track-name").textContent;
        const trackArtist = document.querySelector("#track-artist").textContent;

        const song = {
            trackName,
            trackArtist,
        };
        const response = await fetch("/api/playlist", {
            method: "POST",
            body: JSON.stringify(song),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("Song added to playlist!");
        } else {
            console.log("Error adding song to playlist");
        }
    });
