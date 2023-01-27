document
    .querySelector("#delete-from-playlist")
    .addEventListener("click", async (e) => {
        console.log("delete from playlist button clicked")
        e.preventDefault();
        const response = await fetch("api/playlist/playlist/:id", {
            method: "DELETE"
        });
        if (response.ok) {
            console.log("Song deleted from playlist!");
        };
    });