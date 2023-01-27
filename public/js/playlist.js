const playerEl = document.querySelector('#player');
const trackIdEl =document.querySelector('#track-id');
playerEl.style="border-radius: 50px";

document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id) {
        playerEl.src=`https://open.spotify.com/embed/track/${target.id}?utm_source=generator`;
    }
})