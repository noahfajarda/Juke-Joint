const lyricsEl = document.querySelector("#lyrics");
const trackNameEl = document.querySelector("#track-name");
const trackArtistEl = document.querySelector("#track-artist");
const lyricsButtonEl = document.querySelector("#lyrics-button");

let lyricsClick = false;

lyricsButtonEl.addEventListener("click", () => {
    if (!lyricsClick) {
        lyricsClick = true;
        // TRY TO DO AN EVENTLISTENER, AND THEN RENDER THE LYRICS
        fetch("/api/lyrics/", {
            method: "POST",
            body: JSON.stringify({
                trackName: trackNameEl.textContent,
                trackArtist: trackArtistEl.textContent,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                let lyrics = "";
                let count = 0;
                data.forEach((lyric) => {
                    // if there's no lyrics found, change the color
                    if (lyric == "No lyrics found") {
                        lyricsEl.style.color = "blue";
                    }
                    // add a new line after each element in lyrics array
                    lyric = lyric + "<br />";
                    // add another line after the 3rd instance of '[' in lyrics array
                    // because the formatting for the retrieved data is weird
                    if (lyric[0] == "[") {
                        if (count == 2) {
                            lyric = "<br />" + lyric;
                        }
                        count++;
                    }
                    // append the lyric to 'lyrics'
                    lyrics += lyric;
                });
                // set the text of the lyrics container to 'lyrics'
                lyricsEl.innerHTML = lyrics;
            });
    }
});