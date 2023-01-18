document.querySelector("#track-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const trackEl = document.querySelector("#track_search");
    trackEl.value = trackEl.value.trim();
    console.log(trackEl.value);

    // this is the reason the data populates twice
    // const response = await fetch(`/track/${trackEl.value}`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    // });
    location.replace(`/track/${trackEl.value}`);
    // // console.log(response);
    // if (response.ok) {
    //     document.location.replace(`/track/${trackEl.value}`);
    // } else {
    //     alert("Failed to fetch data");
    // }
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


document.querySelector("#viewPlaylist").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('ANYTHING TEST LOG')
    const response = await fetch(`/api/playlist/playlist/`, {
        method: "GET",
    });

    if (response) {
        console.log('RESPONSE NOT LOGGED')
        document.location.replace(`/api/playlist/playlist/`);
        // document.location.replace(`/playlist/`);
    }
})



document.querySelector("#search-artist").addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetch(`/search/`, {
        method: "GET",
    });

    if (response) {
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
