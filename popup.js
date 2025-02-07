document.getElementById('checkButton').addEventListener('click', function() {
    let text = document.getElementById('editor').value;

    // Call the backend to analyze the text
    analyzeText(text);
});

function analyzeText(text) {
    fetch('http://localhost:3000/analyze-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text
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

function displaySuggestions(suggestions) {
    document.getElementById('suggestions').innerText = suggestions;
}
