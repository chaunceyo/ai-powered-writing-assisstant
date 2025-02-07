// background.js or popup.js
chrome.storage.local.set({ apiKey: process.env.OPEN_AI_API_KEY }, function() {
    console.log('API key is saved.');
});

chrome.storage.local.get('apiKey', function(result) {
    const apiKey = result.apiKey;
    if (apiKey) {
        console.log('API Key:', apiKey);
        // Now you can use the API key in your fetch request
    } else {
        console.error('API key not found!');
    }
});

function analyzeText(text) {
    chrome.storage.local.get('apiKey', function(result) {
        const apiKey = result.apiKey;

        if (!apiKey) {
            console.error('API key is not available.');
            return;
        }

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
    });
}
