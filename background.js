// background.js

chrome.runtime.onInstalled.addListener(function() {
    console.log("Chrome Extension Installed");
  });
  
  // Listen for messages from the popup (or content scripts)
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "analyzeText") {
      // Forward the request to the backend server
      fetch('http://localhost:3000/analyze-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: request.text
        })
      })
      .then(response => response.json())
      .then(data => {
        // Send the backend response back to the popup
        sendResponse({ suggestions: data });
      })
      .catch(error => {
        console.error('Error with the API request:', error);
        sendResponse({ error: "An error occurred while processing your request." });
      });
  
      // Return true to indicate we’ll send a response asynchronously
      return true;
    }
  });
  
