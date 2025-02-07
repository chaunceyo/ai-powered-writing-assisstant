// content.js

// Add a listener for when a user selects text and clicks on the extension button
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'analyzeText') {
        // Get the selected text on the page
        let selectedText = window.getSelection().toString();

        // Retrieve the API key from chrome.storage
        chrome.storage.local.get('apiKey', function(result) {
            const apiKey = result.apiKey;

            if (!apiKey) {
                console.error('API key not found!');
                sendResponse({ suggestions: "API key is missing." });
                return;
            }

            // Call OpenAI API with the selected text
            analyzeText(apiKey, selectedText, sendResponse);
        });
        
        return true;  // Indicates that the response will be sent asynchronously
    }
});

// Function to make the API request to OpenAI
function analyzeText(apiKey, text, sendResponse) {
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Correct the grammar and improve the clarity of the following text:\n\n${text}`,
            max_tokens: 100
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.choices && data.choices.length > 0) {
            sendResponse({ suggestions: data.choices[0].text });
        } else {
            sendResponse({ suggestions: "No suggestions available." });
        }
    })
    .catch(error => {
        console.error('Error with the API request:', error);
        sendResponse({ suggestions: "An error occurred while processing your request." });
    });
}
  