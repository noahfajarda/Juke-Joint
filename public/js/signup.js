// function to capitalize first/last names
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Frontend JS for signup page, this is loaded via the script tag in the signup.handlebars file
const signupFormHandler = async function (event) {
  event.preventDefault();

  const firstNameEl = document.querySelector("#firstname-input-signup");
  const lastNameEl = document.querySelector("#lastname-input-signup");
  const usernameEl = document.querySelector("#username-input-signup");
  const passwordEl = document.querySelector("#password-input-signup");
  console.log(passwordEl);
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      firstname: capitalizeFirstLetter(firstNameEl.value),
      lastname: capitalizeFirstLetter(lastNameEl.value),
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up");
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
