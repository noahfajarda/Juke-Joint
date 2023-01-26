async function addToLikes(e) {
    e.preventDefault();
    const trackName = document.querySelector("#track-name").textContent;
    const trackArtist = document.querySelector("#track-artist").textContent;
    const trackArt = document.querySelector("#track-art").textContent;
    const trackId = document.querySelector("#trackId").textContent;

    const song = {
        trackName,
        trackArtist,
        trackArt,
        trackId,
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
}
// account for add to likes button
document.querySelector("#addToLikes").addEventListener("click", (e) => addToLikes(e))


// account for the heart button
let bool = false;
document.querySelector(".heart").addEventListener("click", (e) => {
    if (!bool) {
        document.querySelector(".heart").classList.add("is-active")
        addToLikes(e)
        bool = true;
    } else {
        document.querySelector(".heart").classList.remove("is-active")
        bool = false;
    }
})

// document
//     .querySelector("#delete-from-likes")
//     .addEventListener("click", async (e) => { 
//         e.preventDefault();
//         const response = await fetch("api/likes/:id", {
//             method: "DELETE"
//         });
//         if (response.ok) {
//             console.log("Song deleted from likes!");
//         };
//     });