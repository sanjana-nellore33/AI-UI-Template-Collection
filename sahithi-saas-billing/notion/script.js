```javascript
"use strict";


/* =====================================================
   NOTION SaaS BILLING UI
   Shared JavaScript
===================================================== */


/* =====================================================
   PROFILE
===================================================== */

function showProfile() {

    alert(
        "Profile menu clicked.\n\n" +
        "Welcome to your Notion workspace!"
    );

}


/* =====================================================
   DASHBOARD
===================================================== */

function createPage() {

    const pageName =
        prompt(
            "Enter a name for your new Notion page:"
        );


    if (pageName === null) {
        return;
    }


    if (pageName.trim() === "") {

        alert(
            "Please enter a page name."
        );

        return;
    }


    alert(
        "New page created:\n\n" +
        pageName.trim()
    );

}


/* =====================================================
   VIEW ALL PAGES
===================================================== */

function viewAllPages() {

    alert(
        "Opening all workspace pages..."
    );

}


/* =====================================================
   OPEN PAGE
===================================================== */

function openPage(pageName) {

    alert(
        "Opening page:\n\n" +
        pageName
    );

}


/* =====================================================
   PRICING
===================================================== */

function setBilling(type) {

    const monthlyBtn =
        document.getElementById("monthlyBtn");


    const yearlyBtn =
        document.getElementById("yearlyBtn");


    const plusPrice =
        document.getElementById("plusPrice");


    const businessPrice =
        document.getElementById("businessPrice");


    const freePrice =
        document.getElementById("freePrice");


    /*
        If the elements do not exist,
        stop safely.
    */

    if (
        !monthlyBtn ||
        !yearlyBtn ||
        !plusPrice ||
        !businessPrice ||
        !freePrice
    ) {
        return;
    }


    /* ===============================
       YEARLY BILLING
    =============================== */

    if (type === "yearly") {

        monthlyBtn.classList.remove("active");

        yearlyBtn.classList.add("active");


        freePrice.textContent =
            "₹0";


        plusPrice.textContent =
            "₹699";


        businessPrice.textContent =
            "₹1,099";


        return;
    }


    /* ===============================
       MONTHLY BILLING
    =============================== */

    monthlyBtn.classList.add("active");

    yearlyBtn.classList.remove("active");


    freePrice.textContent =
        "₹0";


    plusPrice.textContent =
        "₹799";


    businessPrice.textContent =
        "₹1,299";

}


/* =====================================================
   SELECT PLAN
===================================================== */

function selectPlan(planName) {


    if (planName === "Free") {

        alert(
            "You are currently using the Notion Free plan."
        );

        return;
    }


    if (planName === "Plus") {

        alert(
            "Notion Plus selected!\n\n" +
            "This is a demo billing action."
        );

        return;
    }


    if (planName === "Business") {

        alert(
            "Notion Business selected!\n\n" +
            "This is a demo billing action."
        );

        return;
    }


    alert(
        planName + " selected."
    );

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


                    const email =
                        emailInput
                            ? emailInput.value.trim()
                            : "";


                    const workspace =
                        workspaceInput
                            ? workspaceInput.value.trim()
                            : "";


                    if (name === "") {

                        alert(
                            "Please enter your full name."
                        );

                        nameInput.focus();

                        return;
                    }


                    if (email === "") {

                        alert(
                            "Please enter your email address."
                        );

                        emailInput.focus();

                        return;
                    }


                    if (workspace === "") {

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

        const notifications =
            document.getElementById("notifications");


        if (notifications) {

            notifications.addEventListener(
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
           ACTIVITY ALERTS
        ============================================= */

        const activityAlerts =
            document.getElementById("activityAlerts");


        if (activityAlerts) {

            activityAlerts.addEventListener(
                "change",
                function () {

                    if (this.checked) {

                        console.log(
                            "Workspace activity alerts enabled."
                        );

                    } else {

                        console.log(
                            "Workspace activity alerts disabled."
                        );

                    }

                }
            );

        }


        /* =============================================
           PRODUCT UPDATES
        ============================================= */

        const marketing =
            document.getElementById("marketing");


        if (marketing) {

            marketing.addEventListener(
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
           PAGE LOAD
        ============================================= */

        console.log(
            "Notion SaaS UI loaded successfully."
        );

    }
);


/* =====================================================
   CANCEL SUBSCRIPTION
===================================================== */

function cancelPlan() {

    const confirmation =
        confirm(
            "Are you sure you want to cancel " +
            "your Notion Plus subscription?"
        );


    if (confirmation) {

        alert(
            "Subscription cancellation request submitted.\n\n" +
            "This is a demo application."
        );

    } else {

        alert(
            "Your Notion Plus subscription is still active."
        );

    }

}
```
