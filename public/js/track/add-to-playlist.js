document
    .querySelector("#addToPlaylist")
    .addEventListener("click", async (e) => {
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

// document
//     .querySelector("#delete-from-playlist")
//     .addEventListener("click", async (e) => {
//         e.preventDefault();
//         const response = await fetch("api/playlist/:id", {
//             method: "DELETE"
//         });
//         if (response.ok) {
//             console.log("Song deleted from playlist!");
//         };
//     });