/* ------------------------------
   COMMON TOAST MESSAGE
-------------------------------- */

function toast(message) {

    const box = document.getElementById("toast");

    if (!box) {
        return;
    }

    box.textContent = message;

    box.style.display = "block";

    setTimeout(function () {

        box.style.display = "none";

    }, 1800);
}


/* ------------------------------
   ACCOUNT PAGE
-------------------------------- */

function clearActivity() {

    const activity =
        document.getElementById("activityList");

    if (!activity) {
        return;
    }

    activity.innerHTML = `
        <div class="activity-item">
            <div class="activity-icon">
                ✓
            </div>

            <div>
                <b>No recent activity</b>
                <p>Your activity list is empty.</p>
            </div>

            <small>Now</small>
        </div>
    `;

    toast("Activity cleared");
}


/* ------------------------------
   PROFILE PAGE
-------------------------------- */

function updatePreview() {

    const name =
        document.getElementById("nameInput");

    const username =
        document.getElementById("usernameInput");

    const bio =
        document.getElementById("bioInput");

    const previewName =
        document.getElementById("previewName");

    const previewUsername =
        document.getElementById("previewUsername");

    const previewBio =
        document.getElementById("previewBio");


    if (name) {

        previewName.textContent =
            name.value;

    }


    if (username) {

        previewUsername.textContent =
            "@" + username.value;

    }


    if (bio) {

        previewBio.textContent =
            bio.value;

    }
}


function saveProfile() {

    const name =
        document.getElementById("nameInput");

    const username =
        document.getElementById("usernameInput");

    const bio =
        document.getElementById("bioInput");


    if (name) {

        localStorage.setItem(
            "githubName",
            name.value
        );

        localStorage.setItem(
            "githubUsername",
            username.value
        );

        localStorage.setItem(
            "githubBio",
            bio.value
        );

        toast("Profile saved locally");

    } else {

        toast("Profile changes saved");

    }
}


/* ------------------------------
   SETTINGS
-------------------------------- */

function toggle(button) {

    button.classList.toggle("on");


    if (button.classList.contains("on")) {

        button.textContent = "ON";

    } else {

        button.textContent = "OFF";

    }

    toast("Setting updated");
}


function changeTheme(theme) {

    if (theme === "dark") {

        document.body.style.background =
            "#0d1117";

        document.body.style.color =
            "#e6edf3";

        toast("Dark theme selected");

    } else {

        document.body.style.background =
            "#f6f8fa";

        document.body.style.color =
            "#1f2328";

        toast("Light theme selected");
    }

}


/* ------------------------------
   SETTINGS NAVIGATION
-------------------------------- */

function showSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}