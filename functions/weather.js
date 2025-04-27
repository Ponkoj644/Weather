// Netlify serverless function to fetch weather data
const fetch = require('node-fetch');

exports.handler = async function (event) {
    try {
        // Get the API key from environment variables
        const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

        // Check if API key is available
        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // Get city from query parameters
        const { city } = event.queryStringParameters || {};

        if (!city) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'City parameter is required' })
            };
        }

        // Fetch weather data from OpenWeatherMap API
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'City not found' })
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};