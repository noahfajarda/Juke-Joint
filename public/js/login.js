const failedLoginEl = document.querySelector("#failed-login");

// Frontend JS for login page, this is loaded via the script tag in the login.handlebars file
const loginFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector("#username-input-login");
    const passwordEl = document.querySelector("#password-input-login");

    const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { "Content-Type": "application/json" },
    });

    document.querySelector("#main").style.transform = "scale(0)";
    document.querySelector("#main").style.transition =
        "transform 0.5s ease-in-out";
    setTimeout(() => {
        document.querySelector("#main").style.transform = "scale(1)";
    }, 0);

    if (response.ok) {
        document.location.replace("/");
    } else {
        invalidUserLogin();
        usernameEl.value = "";
        passwordEl.value = "";
    }
};

// display message for user input error
function invalidUserLogin() {
    var timeLeft = 2;
    failedLoginEl.style.color = "white";
    failedLoginEl.textContent = "Failed To Log In Please Try Again";
    var timeInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft === -1) {
            clearInterval(timeInterval);
            failedLoginEl.textContent = "";
        }
        return;
    }, 1000);
}

document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);
