document.querySelector("#track-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const trackEl = document.querySelector("#track_search");
    trackEl.value = trackEl.value.trim();
    console.log(trackEl.value);

    const response = await fetch(`/track/${trackEl.value}`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace(`/track/${trackEl.value}`);
    } else {
        alert("Failed to fetch data");
    }
});

document.querySelector("#artist-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const artistEl = document.querySelector("#artist_search");
    artistEl.value = artistEl.value.trim();
    console.log(artistEl.value);

    const response = await fetch(`/artist/${artistEl.value}`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace(`/artist/${artistEl.value}`);
    } else {
        alert("Failed to fetch data");
    }
});

document.querySelector("#album-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const albumEl = document.querySelector("#album_search");
    albumEl.value = albumEl.value.trim();
    console.log(albumEl.value);

    const response = await fetch(`/album/${albumEl.value}`, {
        method: "GET",
        // headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace(`/album/${albumEl.value}`);
    } else {
        alert("Failed to fetch data");
    }
});

