function showTemplates(category) {
    const cards = document.querySelectorAll(".template-card");
    const heading = document.querySelector(".templates .section-heading h2");
    const templatesSection = document.querySelector(".templates");

    cards.forEach(card => {
        const link = card.querySelector("a").getAttribute("href");

        if (
            category === "all" ||
            (category === "ai" && link.includes("sanjana-ai-chat")) ||
            (category === "analytics" && link.includes("spoorthi-analytics")) ||
            (category === "billing" && link.includes("sahithi-saas-billing")) ||
            (category === "settings" && link.includes("harshith-account-settings"))
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    if (category === "ai") {
        heading.textContent = "AI Chat Interfaces";
    } else if (category === "analytics") {
        heading.textContent = "Analytics & Data Visualization";
    } else if (category === "billing") {
        heading.textContent = "SaaS Billing & Pricing";
    } else if (category === "settings") {
        heading.textContent = "SaaS Account & Settings";
    } else {
        heading.textContent = "All UI Templates";
    }

    templatesSection.scrollIntoView({
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", function () {
    showTemplates("all");
});