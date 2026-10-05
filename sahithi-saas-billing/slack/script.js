```javascript
function goToPricing() {
    window.location.href = "pricing.html";
}

function showInvoice() {
    alert(
        "Invoice #SL-2026-0915\n\n" +
        "Slack Pro Subscription\n" +
        "24 members × $8.75\n\n" +
        "Total: $210.00\n" +
        "Status: Paid"
    );
}

function selectPlan(plan) {
    if (plan === "Pro") {
        const confirmUpgrade = confirm(
            "Upgrade your workspace to the Pro plan?"
        );

        if (confirmUpgrade) {
            alert("Success! Your workspace is now on the Pro plan.");
            window.location.href = "index.html";
        }
    } else {
        alert(plan + " plan selected.");
    }
}

function setBilling(type) {
    const monthlyBtn = document.getElementById("monthlyBtn");
    const yearlyBtn = document.getElementById("yearlyBtn");

    const proPrice = document.getElementById("proPrice");
    const businessPrice = document.getElementById("businessPrice");

    if (!monthlyBtn || !yearlyBtn) {
        return;
    }

    if (type === "yearly") {

        monthlyBtn.classList.remove("toggle-active");
        yearlyBtn.classList.add("toggle-active");

        if (proPrice) {
            proPrice.textContent = "$7.25";
        }

        if (businessPrice) {
            businessPrice.textContent = "$12.50";
        }

    } else {

        yearlyBtn.classList.remove("toggle-active");
        monthlyBtn.classList.add("toggle-active");

        if (proPrice) {
            proPrice.textContent = "$8.75";
        }

        if (businessPrice) {
            businessPrice.textContent = "$15";
        }
    }
}

function saveSettings() {
    const workspaceName =
        document.getElementById("workspaceName").value;

    if (workspaceName.trim() === "") {
        alert("Please enter a workspace name.");
        return;
    }

    alert(
        "Settings saved successfully for " +
        workspaceName +
        "."
    );
}

function updatePayment() {
    alert(
        "Payment method update screen opened.\n\n" +
        "Current card: Visa ending in 4242"
    );
}

function deleteWorkspace() {
    const confirmation = confirm(
        "Are you sure you want to delete this workspace?"
    );

    if (confirmation) {
        alert(
            "Demo only: workspace deletion is disabled."
        );
    }
}
```
