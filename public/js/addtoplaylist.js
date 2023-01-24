document.querySelector("#addToPlaylist").addEventListener("click", async (e) => {
    e.preventDefault();
    
    const trackName = document.querySelector("#trackName").textContent;
    const trackArtist = document.querySelector("#trackArtist").textContent;

    console.log("DEBUGGING PURPOSES")

    const song = {
        trackName,
        trackArtist
    }
    console.log(song);
    const response = await fetch('/api/playlist', {
        method: "POST",
        body: JSON.stringify(song),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok){
        console.log("Song added to playlist!");
    } else {
        console.log("Error adding song to playlist");
    }
});