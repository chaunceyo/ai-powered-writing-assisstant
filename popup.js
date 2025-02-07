// popup.js
document.getElementById('checkButton').addEventListener('click', function() {
    let text = document.getElementById('editor').value;

    // Retrieve API key from chrome.storage
    chrome.storage.local.get('apiKey', function(result) {
        const apiKey = result.apiKey;

        if (!apiKey) {
            console.error('API key not found!');
            displaySuggestions("API key is missing.");
            return;
        }

        // Send the text to the OpenAI API for grammar correction
        analyzeText(apiKey, text);
    });
});

// Function to make the API request to OpenAI
function analyzeText(apiKey, text) {
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
            displaySuggestions(data.choices[0].text);
        } else {
            displaySuggestions("No suggestions available.");
        }
    })
    .catch(error => {
        console.error('Error with the API request:', error);
        displaySuggestions("An error occurred while processing your request.");
    });
}

// Function to display the response from OpenAI
function displaySuggestions(suggestions) {
    document.getElementById('suggestions').innerText = suggestions;
}
