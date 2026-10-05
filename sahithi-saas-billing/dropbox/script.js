
"use strict";

/* =====================================================
   DROPBOX SaaS BILLING UI
   Shared JavaScript
   Used by:
   - index.html
   - pricing.html
   - settings.html
===================================================== */


/* =====================================================
   PROFILE
===================================================== */

function showProfile() {
    alert("Profile menu clicked.");
}


/* =====================================================
   DASHBOARD
===================================================== */

/* Upload File */

function uploadFile() {
    alert(
        "Upload feature demo:\n\n" +
        "A file upload window would open here."
    );
}


/* View All Files */

function viewAllFiles() {
    alert(
        "Opening all files..."
    );
}


/* Open Individual File */

function openFile(fileName) {
    alert(
        "Opening file:\n\n" + fileName
    );
}


/* =====================================================
   PRICING
===================================================== */

function setBilling(type) {

    const monthlyButton =
        document.getElementById("monthlyBtn");

    const yearlyButton =
        document.getElementById("yearlyBtn");

    const basicPrice =
        document.getElementById("basicPrice");

    const plusPrice =
        document.getElementById("plusPrice");

    const professionalPrice =
        document.getElementById("professionalPrice");


    /*
        The pricing elements only exist on pricing.html.

        If this function is somehow called on another
        page, stop safely instead of producing an error.
    */

    if (
        !monthlyButton ||
        !yearlyButton ||
        !basicPrice ||
        !plusPrice ||
        !professionalPrice
    ) {
        return;
    }


    /* ===============================
       YEARLY
    =============================== */

    if (type === "yearly") {

        monthlyButton.classList.remove("active");

        yearlyButton.classList.add("active");


        basicPrice.textContent = "₹0";

        plusPrice.textContent = "₹799";

        professionalPrice.textContent = "₹1,199";

        return;
    }


    /* ===============================
       MONTHLY
    =============================== */

    monthlyButton.classList.add("active");

    yearlyButton.classList.remove("active");


    basicPrice.textContent = "₹0";

    plusPrice.textContent = "₹999";

    professionalPrice.textContent = "₹1,499";
}


/* =====================================================
   SELECT PLAN
===================================================== */

function selectPlan(planName) {

    switch (planName) {

        case "Basic":

            alert(
                "You are already using the Dropbox Basic plan."
            );

            break;


        case "Plus":

            alert(
                "Dropbox Plus selected!\n\n" +
                "This is a demo billing action."
            );

            break;


        case "Professional":

            alert(
                "Dropbox Professional selected!\n\n" +
                "This is a demo billing action."
            );

            break;


        default:

            alert(
                planName + " selected."
            );

    }
}


/* =====================================================
   SETTINGS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =============================================
           PROFILE FORM
        ============================================= */

        const profileForm =
            document.getElementById("profileForm");


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const nameInput =
                        document.getElementById("name");


                    const emailInput =
                        document.getElementById("email");


                    const workspaceInput =
                        document.getElementById("workspace");


                    if (!nameInput) {
                        return;
                    }


                    const name =
                        nameInput.value.trim();


                    if (name === "") {

                        alert(
                            "Please enter your name."
                        );

                        nameInput.focus();

                        return;
                    }


                    if (
                        emailInput &&
                        emailInput.value.trim() === ""
                    ) {

                        alert(
                            "Please enter your email address."
                        );

                        emailInput.focus();

                        return;
                    }


                    if (
                        workspaceInput &&
                        workspaceInput.value.trim() === ""
                    ) {

                        alert(
                            "Please enter your workspace name."
                        );

                        workspaceInput.focus();

                        return;
                    }


                    alert(
                        "Profile changes saved successfully!"
                    );

                }
            );
        }


        /* =============================================
           EMAIL NOTIFICATIONS
        ============================================= */

        const notificationSwitch =
            document.getElementById("notifications");


        if (notificationSwitch) {

            notificationSwitch.addEventListener(
                "change",
                function () {

                    if (this.checked) {

                        console.log(
                            "Email notifications enabled."
                        );

                    } else {

                        console.log(
                            "Email notifications disabled."
                        );

                    }

                }
            );
        }


        /* =============================================
           STORAGE ALERTS
        ============================================= */

        const storageSwitch =
            document.getElementById("storageAlerts");


        if (storageSwitch) {

            storageSwitch.addEventListener(
                "change",
                function () {

                    if (this.checked) {

                        console.log(
                            "Storage alerts enabled."
                        );

                    } else {

                        console.log(
                            "Storage alerts disabled."
                        );

                    }

                }
            );
        }


        /* =============================================
           PRODUCT UPDATES
        ============================================= */

        const marketingSwitch =
            document.getElementById("marketing");


        if (marketingSwitch) {

            marketingSwitch.addEventListener(
                "change",
                function () {

                    if (this.checked) {

                        console.log(
                            "Product updates enabled."
                        );

                    } else {

                        console.log(
                            "Product updates disabled."
                        );

                    }

                }
            );
        }


        /* =============================================
           PAGE LOADED
        ============================================= */

        console.log(
            "Dropbox SaaS UI loaded successfully."
        );

    }
);


/* =====================================================
   CANCEL SUBSCRIPTION
===================================================== */

function cancelPlan() {

    const confirmation =
        confirm(
            "Are you sure you want to cancel your " +
            "Dropbox Plus subscription?"
        );


    if (confirmation) {

        alert(
            "Subscription cancellation request " +
            "submitted.\n\n" +
            "This is a demo application."
        );

    } else {

        alert(
            "Your subscription is still active."
        );

    }
}

