// Show More Content Button
document.getElementById("show-more-button").addEventListener("click", function() {
    const moreContent = document.getElementById("more-content");
    moreContent.classList.toggle("hidden");
    if (moreContent.classList.contains("hidden")) {
        this.textContent = "Show More Content";
    } else {
        this.textContent = "Hide Content";
    }
});

// Tab Navigation
const tabs = document.querySelectorAll(".tab-button");
tabs.forEach(tab => {
    tab.addEventListener("click", function() {
        const tabId = this.getAttribute("data-tab");
        const contentId = "tab" + tabId + "-content";

        // Hide all tab contents
        document.querySelectorAll(".tab-content").forEach(content => {
            content.classList.remove("active");
        });

        // Show the selected tab content
        document.getElementById(contentId).classList.add("active");

        // Set active tab style
        tabs.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
    });
});

// Contact Form Validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Simple validation
    if (!name || !email) {
        alert("Please fill in all fields!");
    } else {
        document.getElementById("form-message").classList.remove("hidden");
        document.getElementById("form-message").textContent = `Thank you for contacting us, ${name}! We will reply to ${email} shortly.`;
    }
});

// Initial Tab Setup
document.querySelector(".tab-button").click(); // Click first tab to show

