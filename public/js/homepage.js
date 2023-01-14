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

    location.replace(`/artist/${artistEl.value}`);
});

document.querySelector("#album-post").addEventListener("submit", async (e) => {
    e.preventDefault();
    const albumEl = document.querySelector("#album_search");
    albumEl.value = albumEl.value.trim();
    console.log(albumEl.value);

    location.replace(`/album/${albumEl.value}`);
});

const handleLogout = async () => {
    const response = await fetch("/api/user/logout", {
        method: "POST",
    });

    response.ok && document.location.replace("/login");
};

document.querySelector("#logout-btn").addEventListener("click", handleLogout);
