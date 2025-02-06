document.addEventListener('input', function(event) {
    if(event.target && event.target.tagName === 'TEXTAREA'){
        let text = event.target.value;
        analyzeText(text, event.target);
    }
});

function analyzeText(text, targetElement) {
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
    .then(data => displaySuggestions(data.choices[0].text, targetElement));
}

function displaySuggestions(suggestions) {
    const suggestionElement = document.createElement('div');
    suggestionElement.innerText = suggestions;
    document.body.appendChild(suggestionElement)
}