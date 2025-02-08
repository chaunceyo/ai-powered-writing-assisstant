// Import required libraries
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Enable CORS for cross-origin requests (important for Chrome extensions)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Endpoint to analyze text
app.post('/analyze-text', async (req, res) => {
    const text = req.body.text;

    // Check if text is provided in the request body
    if (!text) {
        return res.status(400).json({ error: 'Text is required.' });
    }

    try {
        // Log the OpenAI API Key (for debugging purposes, remove in production)
        console.log('Using OpenAI API Key:', process.env.OPENAI_API_KEY);  // Check if the key is loaded properly

        // Send request to OpenAI API (using GPT-3.5-Turbo)
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',  // Model being used (can also try other models like gpt-4)
            messages: [{
                role: 'user',
                content: `Correct the grammar and improve the clarity of the following text:\n\n${text}`
            }],
            max_tokens: 100,  // Optional: Set max tokens for response
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Send the API Key in the request headers
                'Content-Type': 'application/json',
            }
        });

        // Send OpenAI API response back to the client
        res.json(response.data);
    } catch (error) {
        // Log the error for debugging
        console.error('Error with the OpenAI API request:', error.response ? error.response.data : error.message);

        // Respond with an error message
        res.status(500).json({
            error: 'An error occurred with the OpenAI API request.',
            details: error.response ? error.response.data : error.message,
        });
    }
});

// Start the Express server on port 3000
app.listen(3000, () => {
    console.log('Backend server running at http://localhost:3000');
});
