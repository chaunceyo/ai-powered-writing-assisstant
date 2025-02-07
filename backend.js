// backend.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to forward the request to OpenAI
app.post('/analyze-text', async (req, res) => {
    const text = req.body.text;

    try {
        // Make the request to OpenAI API
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `Correct the grammar and improve the clarity of the following text:\n\n${text}`,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Send the result back to the client (Chrome extension)
        res.json(response.data);
    } catch (error) {
        console.error('Error with the API request:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
