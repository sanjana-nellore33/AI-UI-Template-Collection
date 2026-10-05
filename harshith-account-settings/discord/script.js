function toast(message) {

    const box = document.getElementById("toast");

    box.textContent = message;

    box.style.display = "block";

    setTimeout(function () {
        box.style.display = "none";
    }, 1800);
}


function toggle(button) {

    button.classList.toggle("on");

    if (button.classList.contains("on")) {
        button.textContent = "ON";
    } else {
        button.textContent = "OFF";
    }
}


function saveAccount() {

    const username =
        document.getElementById("username").value;

    localStorage.setItem(
        "discordUsername",
        username
    );

    toast("Account saved locally");
}


function saveProfile() {

    const name =
        document.getElementById("displayName").value;

    localStorage.setItem(
        "discordName",
        name
    );

    toast("Profile saved locally");
}


function setTheme(theme) {

    document.body.dataset.theme = theme;

    toast(theme + " theme selected");
}


function confirmAction() {

    if (confirm("Delete this demo account?")) {

        toast("Demo deletion action selected");

    }
}