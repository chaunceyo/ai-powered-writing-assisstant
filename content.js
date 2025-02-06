document.addEventListener('input', function(event) {
    if (event.target && event.target.tagName === 'TEXTAREA') {
      let text = event.target.value;
      analyzeText(text, event.target);
    }
  });
  
  function analyzeText(text, targetElement) {
    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Correct the grammar and improve the clarity of the following text:\n\n${text}`,
        max_tokens: 100
      })
    })
    .then(response => response.json())
    .then(data => displaySuggestions(data.choices[0].text, targetElement));
  }
  
  function displaySuggestions(suggestions, targetElement) {
    let suggestionElement = document.createElement('div');
    suggestionElement.style.position = 'absolute';
    suggestionElement.style.top = `${targetElement.offsetTop + targetElement.offsetHeight}px`;
    suggestionElement.style.left = `${targetElement.offsetLeft}px`;
    suggestionElement.style.backgroundColor = '#f0f0f0';
    suggestionElement.style.padding = '5px';
    suggestionElement.style.border = '1px solid #ccc';
    suggestionElement.innerText = suggestions;
  
    document.body.appendChild(suggestionElement);
  }
  