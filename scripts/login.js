const loginBtn = document.getElementById("login");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const remembermeCheckbox = document.getElementById("rememberMe");
const incorrectCredentialsNote = document.getElementById("incorrectCredentialsNote");

function checkLoggedUser() {
    const userLoggedIn = localStorage.getItem("loggedIn");
    console.log(userLoggedIn);
    if (userLoggedIn == "yes") {
        document.location.href = "../index.html";
    }
};

window.onload = checkLoggedUser();

loginBtn.addEventListener("click", function () {
    incorrectCredentialsNote.classList.add("hide");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const remember = remembermeCheckbox.checked;
    if (username == "AdminSEF123" && password == "SeF@ctORy$$456") {
        localStorage.setItem("loggedIn", "yes");
        if (remember)
            localStorage.setItem("remember", "yes");
        document.location.href = "../index.html";
    }
    else {
        incorrectCredentialsNote.classList.remove("hide");
        incorrectCredentialsNote.classList.add("incorrect-credentials-note");
    }
});

