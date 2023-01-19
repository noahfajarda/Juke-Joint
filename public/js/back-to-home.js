document.querySelector("#go-back-home").addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("test")
    document.location.replace(`/`);
});
