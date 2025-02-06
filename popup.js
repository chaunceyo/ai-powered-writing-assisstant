document.getElementById('checkButton').addEventListener('click', function() {
    let text = document.getElementById('editor').value;
    analyzeText(text);
});

function analyzeText(text) {
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Correct the grammar and improve the clarity of the following text:\n\n${text}`,
            max_tokens: 100
        })
    })
    .then(res => res.json())
    .then(data => {
        // Check if 'choices' exists and has at least one item
        if (data.choices && data.choices.length > 0) {
            displaySuggestions(data.choices[0].text);
        } else {
            // Handle the case where no choices are returned
            displaySuggestions("No suggestions available.");
        }
    })
    .catch(error => {
        // Handle network errors or API issues
        console.error('Error with the API request:', error);
        displaySuggestions("An error occurred while processing your request.");
    });
}

function displaySuggestions(suggestions) {
    document.getElementById('suggestions').innerText = suggestions;
}
