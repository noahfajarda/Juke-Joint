document.querySelector("#addToLikes").addEventListener("click", async (e) => {
    e.preventDefault();
    
    const trackName = document.querySelector("#trackName").textContent;
    const trackArtist = document.querySelector("#trackArtist").textContent;
    const trackId = document.querySelector("#trackId").textContent;

    console.log("DEBUGGING PURPOSES FOR LIKES")

    const song = {
        trackName,
        trackArtist,
        trackId,
        title: "FOR LIKES",
    }
    console.log(song);
    const response = await fetch('/api/likes/', {
        method: "POST",
        body: JSON.stringify(song),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok){
        console.log("Song added to likes!");
    } else {
        console.log("Error adding song to likes!");
    }
});