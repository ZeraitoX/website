// Select DOM elements
const urlInput = document.getElementById('url-input');
const loadButton = document.getElementById('load-button');
const iframe = document.getElementById('website-frame');
const consoleOutput = document.getElementById('console-output');
const networkOutput = document.getElementById('network-output');
const domOutput = document.getElementById('dom-output');
const resourceOutput = document.getElementById('resource-output');
const performanceOutput = document.getElementById('performance-output');

// Function to log messages to console output section
function logToConsole(message) {
    const logLine = document.createElement('p');
    logLine.textContent = message;
    consoleOutput.appendChild(logLine);
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll
}

// Function to log network requests to the network output section
function logNetworkRequest(requestDetails) {
    const logLine = document.createElement('p');
    logLine.textContent = `Request: ${requestDetails.method} ${requestDetails.url} - Status: ${requestDetails.status}`;
    networkOutput.appendChild(logLine);
    networkOutput.scrollTop = networkOutput.scrollHeight; // Auto-scroll
}

// Function to monitor DOM changes
function monitorDOMChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const mutationMessage = `DOM Mutation: ${mutation.type} on ${mutation.target.nodeName}`;
            const logLine = document.createElement('p');
            logLine.textContent = mutationMessage;
            domOutput.appendChild(logLine);
            domOutput.scrollTop = domOutput.scrollHeight; // Auto-scroll
        });
    });

    observer.observe(iframe.contentWindow.document, {
        childList: true,
        subtree: true,
    });
}

// Function to monitor resource loading errors
function monitorResourceErrors() {
    iframe.contentWindow.addEventListener('error', function(e) {
        if (e.target && e.target.src) {
            const errorMessage = `Resource Load Error: ${e.target.src}`;
            const logLine = document.createElement('p');
            logLine.textContent = errorMessage;
            resourceOutput.appendChild(logLine);
            resourceOutput.scrollTop = resourceOutput.scrollHeight; // Auto-scroll
        }
    });
}

// Performance Monitoring: Time until the page is fully loaded
function monitorPerformance() {
    const performanceData = performance.getEntriesByType('navigation')[0];
    const logLine = document.createElement('p');
    logLine.textContent = `Performance: Time to Load: ${performanceData.loadEventEnd}ms`;
    performanceOutput.appendChild(logLine);
}

// Function to load the website in the iframe and setup monitoring
loadButton.addEventListener('click', function() {
    const url = urlInput.value;
    if (!url) {
        alert("Please enter a valid URL!");
        return;
    }

    try {
        // Clear previous outputs
        consoleOutput.innerHTML = "<p>Loading website...</p>";
        networkOutput.innerHTML = "<p>Loading network requests...</p>";
        domOutput.innerHTML = "<p>Monitoring DOM changes...</p>";
        resourceOutput.innerHTML = "<p>Monitoring resource load errors...</p>";
        performanceOutput.innerHTML = "<p>Monitoring performance...</p>";

        // Set the iframe src to the entered URL
        iframe.src = url;

        iframe.onload = function() {
            logToConsole("Website loaded successfully!");
            monitorDOMChanges();
            monitorResourceErrors();
            monitorPerformance();
        };

        // Capture console logs from the iframe
        iframe.contentWindow.console.log = function(message) {
            logToConsole(`Console Log: ${message}`);
        };

        iframe.contentWindow.console.error = function(message) {
            logToConsole(`Console Error: ${message}`);
        };

        // Intercept and log network requests (fetch and XMLHttpRequest)
        const originalFetch = iframe.contentWindow.fetch;
        iframe.contentWindow.fetch = function(...args) {
            logNetworkRequest({
                method: 'FETCH',
                url: args[0],
                status: 'pending',
            });
            return originalFetch(...args);
        };

        const originalXhrOpen = iframe.contentWindow.XMLHttpRequest.prototype.open;
        iframe.contentWindow.XMLHttpRequest.prototype.open = function(method, url) {
            logNetworkRequest({
                method: method,
                url: url,
                status: 'pending',
            });
            return originalXhrOpen.apply(this, arguments);
        };
        
    } catch (error) {
        logToConsole(`Failed to load website: ${error.message}`);
    }
});

