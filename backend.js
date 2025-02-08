// backend.js

const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Loads environment variables from .env file

const app = express();
const port = 3000;

app.use(express.json());

// API route to handle text analysis requests from Chrome extension
app.post('/analyze-text', async (req, res) => {
    const text = req.body.text;  // Get the text sent by the Chrome extension

    if (!text) {
        return res.status(400).json({ error: 'Text is required.' });
    }

    try {
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

        // Send the OpenAI response back to the Chrome extension
        res.json(response.data);
    } catch (error) {
        console.error('Error with the API request:', error.message);
        // Send a detailed error message back to the frontend
        res.status(500).json({
            error: 'An error occurred while processing your request.',
            details: error.response ? error.response.data : error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
