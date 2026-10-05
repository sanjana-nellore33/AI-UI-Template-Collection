function toast(message) {

    const box = document.getElementById("toast");

    box.textContent = message;

    box.style.display = "block";

    setTimeout(function () {
        box.style.display = "none";
    }, 1600);
}


function toggle(button) {

    button.classList.toggle("on");

    if (button.classList.contains("on")) {

        button.textContent = "ON";

    } else {

        button.textContent = "OFF";

    }

    toast("Preference updated");
}


function saveProfile() {

    const name =
        document.getElementById("name").value;

    localStorage.setItem(
        "figmaName",
        name
    );

    toast("Profile saved locally");
}