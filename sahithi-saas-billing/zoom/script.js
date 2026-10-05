```javascript
function openPlans() {
    window.location.href = "pricing.html";
}


function updateCard() {
    alert(
        "Payment Method\n\n" +
        "Current card: Visa ending 4242\n\n" +
        "Demo: Payment update screen opened."
    );
}


function changeBilling(type) {

    const monthlyBtn =
        document.getElementById("monthlyBtn");

    const yearlyBtn =
        document.getElementById("yearlyBtn");

    const proPrice =
        document.getElementById("proPrice");

    const businessPrice =
        document.getElementById("businessPrice");


    if (type === "yearly") {

        monthlyBtn.classList.remove("selected");

        yearlyBtn.classList.add("selected");

        proPrice.textContent = "$11.99";

        businessPrice.textContent = "$17.49";

    } else {

        yearlyBtn.classList.remove("selected");

        monthlyBtn.classList.add("selected");

        proPrice.textContent = "$13.33";

        businessPrice.textContent = "$18.99";
    }
}


function choosePlan(plan) {

    if (plan === "Basic") {

        alert(
            "The Basic plan is currently selected."
        );

        return;
    }


    const confirmation = confirm(
        "Do you want to choose the " +
        plan +
        " plan?"
    );


    if (confirmation) {

        alert(
            "Success!\n\n" +
            "Your workspace has been switched to " +
            plan +
            "."
        );

        window.location.href = "index.html";
    }
}


function saveAccount() {

    const companyName =
        document.getElementById("companyName").value;


    if (companyName.trim() === "") {

        alert(
            "Please enter your organization name."
        );

        return;
    }


    alert(
        "Account settings saved successfully!\n\n" +
        "Organization: " +
        companyName
    );
}


function cancelSubscription() {

    const confirmation = confirm(
        "Are you sure you want to cancel your Zoom subscription?"
    );


    if (confirmation) {

        alert(
            "Demo only: subscription cancellation is disabled."
        );
    }
}
```
