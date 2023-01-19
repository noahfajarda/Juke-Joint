const lyricsEl = document.querySelector("#lyrics");
const trackNameEl = document.querySelector("#track-name");
const trackArtistEl = document.querySelector("#track-artist");

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
            if (lyric == "No lyrics found") {
                lyricsEl.style.color = "blue";
            }
            lyric = lyric + "<br />";
            if (lyric[0] == "[") {
                if (count == 2) {
                    lyric = "<br />" + lyric;
                }
                count++;
            }
            lyrics += lyric;
        });
        lyricsEl.innerHTML = lyrics;
    });
