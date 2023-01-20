document.querySelector("#track-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const trackEl = document.querySelector("#track_search");
    trackEl.value = trackEl.value.trim();
    console.log(trackEl.value);

    location.replace(`/track/${trackEl.value}`);
});

document.querySelector("#artist-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const artistEl = document.querySelector("#artist_search");
    artistEl.value = artistEl.value.trim();
    console.log(artistEl.value);

    location.replace(`/artist/${artistEl.value}`);
});

document.querySelector("#album-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const albumEl = document.querySelector("#album_search");
    albumEl.value = albumEl.value.trim();
    console.log(albumEl.value);

    location.replace(`/album/${albumEl.value}`);
});

document.querySelector("#viewPlaylist").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("ANYTHING TEST LOG");
    const response = await fetch(`/api/playlist/playlist/`, {
        method: "GET",
    });

    if (response) {
        console.log("RESPONSE NOT LOGGED");
        document.location.replace(`/api/playlist/playlist/`);
        // document.location.replace(`/playlist/`);
    }
});

document.querySelector("#viewLikes").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("LIKE TEST LOG");
    const response = await fetch(`/api/likes/likes/`, {
        method: "GET",
    });

    if (response) {
        console.log("RESPONSE FOR LIKES");
        document.location.replace(`/api/likes/likes/`);
    }
});

document
    .querySelector("#search-artist")
    .addEventListener("click", async (e) => {
        console.log("blah blah blah");
        e.preventDefault();
        // const response = await fetch(`/search/`, {
        //     method: "GET",
        // });

        if (true) {
            document.location.replace(`/search/`);
        }
    });

const handleLogout = async () => {
    const response = await fetch("/api/user/logout", {
        method: "POST",
    });

    response.ok && document.location.replace("/login");
};

document.querySelector("#logout-btn").addEventListener("click", handleLogout);
