document.querySelector("#viewPlaylist").addEventListener("click", async (e) => {
    const userId = document.querySelector("#user-Id").textContent;

    e.preventDefault();
    const response = await fetch(`/api/playlist/playlist/${userId}`, {
        method: "GET",
    });

    if (response) {
        document.location.replace(`/api/playlist/playlist/${userId}`);
    }
});

document.querySelector("#viewLikes").addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/likes/likes/`, {
        method: "GET",
    });

    if (response) {
        document.location.replace(`/api/likes/likes/`);
    }
});
document.querySelector("#viewHome").addEventListener("click", async (e) => {
    e.preventDefault();
    document.location.replace(`/`);
});