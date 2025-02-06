document.getElementById('checkButton').addEventListener('click', function() {
    let text = document.getElementById('editor').value;
    analyzeText(text)
})

function analyzeText(text) {
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Check this text for grammatical errors and suggest improvements: ${text}`,
            max_tokens: 100
        })
    })
    .then(res => res.json())
    .then(data => displaySuggestions(data.choices[0].text));
}

function displaySuggestions(suggestions) {
    document.getElementById('suggestions').innerText = suggestions;
  }