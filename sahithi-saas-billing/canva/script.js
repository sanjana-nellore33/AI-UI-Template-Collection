/* =====================================================
   CANVA+ JAVASCRIPT
   Shared by:
   - index.html
   - pricing.html
   - settings.html
===================================================== */


/* =====================================================
   DASHBOARD
===================================================== */

function createDesign() {
  alert("Your new Canva design workspace is ready!");
}


function openDesign(designName) {
  alert("Opening: " + designName);
}


function viewAllDesigns() {
  alert("Showing all your designs.");
}


/* =====================================================
   PRICING
===================================================== */

function setBilling(type) {

  const monthlyBtn =
    document.getElementById("monthlyBtn");

  const yearlyBtn =
    document.getElementById("yearlyBtn");

  const proPrice =
    document.getElementById("proPrice");

  const teamsPrice =
    document.getElementById("teamsPrice");


  /* Make sure pricing elements exist */

  if (
    !monthlyBtn ||
    !yearlyBtn ||
    !proPrice ||
    !teamsPrice
  ) {
    return;
  }


  if (type === "yearly") {

    monthlyBtn.classList.remove("active");

    yearlyBtn.classList.add("active");

    /*
      Mock yearly-equivalent prices
      for the UI demonstration.
    */

    proPrice.textContent = "₹399";

    teamsPrice.textContent = "₹799";

  } else {

    yearlyBtn.classList.remove("active");

    monthlyBtn.classList.add("active");

    proPrice.textContent = "₹499";

    teamsPrice.textContent = "₹999";
  }
}


function selectPlan(planName) {

  if (planName === "Free") {

    alert(
      "You are already using the Canva Free plan."
    );

    return;
  }


  if (planName === "Pro") {

    const confirmation =
      confirm(
        "Would you like to upgrade to Canva Pro?"
      );

    if (confirmation) {

      alert(
        "Canva Pro selected. Continue to checkout."
      );
    }

    return;
  }


  if (planName === "Teams") {

    alert(
      "Canva Teams selected. Continue to checkout."
    );
  }
}


/* =====================================================
   SETTINGS - PROFILE
===================================================== */

const profileForm =
  document.getElementById("profileForm");


if (profileForm) {

  profileForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      const name =
        document.getElementById("name").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const workspace =
        document.getElementById("workspace").value.trim();


      if (
        name === "" ||
        email === "" ||
        workspace === ""
      ) {

        alert(
          "Please complete all profile fields."
        );

        return;
      }


      alert(
        "Your profile settings have been saved successfully!"
      );
    }
  );
}


/* =====================================================
   SETTINGS - CANCEL SUBSCRIPTION
===================================================== */

function cancelPlan() {

  const confirmation =
    confirm(
      "Are you sure you want to cancel your Canva Pro subscription?"
    );


  if (confirmation) {

    alert(
      "Your cancellation request has been submitted."
    );

  } else {

    alert(
      "Your Canva Pro subscription remains active."
    );
  }
}


/* =====================================================
   PROFILE BUTTON
===================================================== */

const profileButton =
  document.querySelector(".profile");


if (profileButton) {

  profileButton.addEventListener(
    "click",
    function () {

      alert(
        "Signed in as Sahithi"
      );

    }
  );
}


/* =====================================================
   PREFERENCE SWITCHES
===================================================== */

const notifications =
  document.getElementById("notifications");


if (notifications) {

  notifications.addEventListener(
    "change",
    function () {

      if (this.checked) {

        console.log(
          "Email notifications enabled"
        );

      } else {

        console.log(
          "Email notifications disabled"
        );

      }

    }
  );
}


const marketing =
  document.getElementById("marketing");


if (marketing) {

  marketing.addEventListener(
    "change",
    function () {

      if (this.checked) {

        console.log(
          "Marketing emails enabled"
        );

      } else {

        console.log(
          "Marketing emails disabled"
        );

      }

    }
  );
}