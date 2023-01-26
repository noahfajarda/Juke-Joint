document.querySelector("#track-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const trackEl = document.querySelector("#track_search");
    // actual user input
    trackEl.value = trackEl.value.trim();

    // retrieve data for the user input
    const data = await fetch(`/api/data/${trackEl.value}`, {
        method: 'POST',
        body: JSON.stringify({
            type: "track"
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    // retrieved data input
    const data1 = await data.json();

    // input == user inputted track
    // output == ACTUAL track name & artist
    // because some songs have a '/', it must be replaced to avoid URL error
    data1.trackName = data1.trackName.replace("/", " ")
    data1.trackArtist = data1.trackArtist.replace("/", " ")
    // replace the URL with data retrieved from fetch
    location.replace(`/track/${data1.trackName} ${data1.trackArtist}`);
});

document.querySelector("#artist-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const artistEl = document.querySelector("#artist_search");
    artistEl.value = artistEl.value.trim();

    // retrieve data for the user input
    const data = await fetch(`/api/data/${artistEl.value}`, {
        method: 'POST',
        body: JSON.stringify({
            type: "artist"
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    // retrieved data input
    const data1 = await data.json();

    // replace the URL with data retrieved from fetch
    location.replace(`/artist/${data1.artistName}`);
});

document.querySelector("#album-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const albumEl = document.querySelector("#album_search");
    albumEl.value = albumEl.value.trim();

    // retrieve data for the user input
    const data = await fetch(`/api/data/${albumEl.value}`, {
        method: 'POST',
        body: JSON.stringify({
            type: "album"
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    // retrieved data input
    const data1 = await data.json();

    // replace the URL with data retrieved from fetch
    location.replace(`/album/${data1.albumName} ${data1.albumArtist}`);
});

document
    .querySelector("#search-artist")
    .addEventListener("click", async (e) => {
        e.preventDefault();
        if (true) {
            document.location.replace(`/search/`);
        }
    });