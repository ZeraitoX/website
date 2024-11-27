// Toggle button functionality
document.getElementById("toggle-button").addEventListener("click", function() {
    const extraInfo = document.getElementById("extra-info");
    if (extraInfo.style.display === "none" || extraInfo.style.display === "") {
        extraInfo.style.display = "block";
        this.innerText = "Hide Extra Info";
    } else {
        extraInfo.style.display = "none";
        this.innerText = "Show Extra Info";
    }
});

// Simulating server status update
function updateServerStatus() {
    const statusMessage = "Server is online! Players: 150/500";
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById("status-info").innerText = `Status: ${statusMessage}, Time: ${currentTime}`;
}

// Update status every 5 seconds
setInterval(updateServerStatus, 5000);
updateServerStatus();  // Initial call to display status immediately

