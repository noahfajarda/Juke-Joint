document.querySelector("#viewPlaylist").addEventListener("click", async (e) => {
    const userId = document.querySelector("#user-Id").textContent;
    console.log(userId);

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
document.querySelector("#viewLikes2").addEventListener("click", async (e) => {
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

const handleLogout = async () => {
    const response = await fetch("/api/user/logout", {
        method: "POST",
    });
    response.ok && document.location.replace("/login");
};

document.querySelector("#logout-btn").addEventListener("click", handleLogout);
document.querySelector("#resize-logout-btn").addEventListener("click", handleLogout);

document
    .querySelector("#search-artist")
    .addEventListener("click", async (e) => {
        e.preventDefault();
        if (true) {
            document.location.replace(`/search/`);
        }
    });
