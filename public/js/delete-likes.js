document
    .querySelector("#delete-from-likes")
    .addEventListener("click", async (e) => {
        console.log("delete from likes button clicked")
        e.preventDefault();



        const response = await fetch("/api/likes/:id", {
            method: "DELETE"
        });
        if (response.ok) {
            console.log("Song deleted from likes!");
        };
    });