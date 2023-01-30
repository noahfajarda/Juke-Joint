const renderChoices = (data) => {
    //do DOM manipu here
    const choicesEl = document.querySelector("#choices");
    choicesEl.innerHTML = "";
    data.forEach(({ name }) => {
        //create element
        const choiceEl = document.createElement("div");
        choiceEl.classList.add("auto-choice");
        choiceEl.textContent = name;
        //anchor tag wrap each choice is more ideal
        const anchorEl = document.createElement("a");
        anchorEl.appendChild(choiceEl);
        anchorEl.setAttribute("href", `/artist/${name}`);

        choicesEl.appendChild(anchorEl);
    });
};

const search = async (keyword) => {
    if (!keyword || !keyword.length) return;
    const res = await fetch("/api/search", {
        body: JSON.stringify({ keyword }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
    const data = await res.json();
    if (data && data.length) {
        renderChoices(data);
    }
};

let newTimeout;
const debounceTime = 200;
document.querySelector("#search").addEventListener("keyup", function () {
    //add debounce to prevent too many network calls
    newTimeout && clearTimeout(newTimeout);
    newTimeout = setTimeout(() => search(this.value), debounceTime);
    if (this.value.length == 0) {
        const choicesEl = document.querySelector("#choices");
        choicesEl.innerHTML = "";
    }
});
