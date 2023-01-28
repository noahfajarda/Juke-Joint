const playerEl = document.querySelector('#player');
const trackIdEl = document.querySelector('#track-id');
playerEl.style = "border-radius: 50px";
playerEl.style.display = "none";

document.addEventListener("click", (e) => {
    playerEl.style.display = "block";
    const target = e.target;
    if (target.id) {
        playerEl.src = `https://open.spotify.com/embed/track/${target.id}?utm_source=generator`;
    }
})