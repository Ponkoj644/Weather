# Weather App - Netlify Deployment Guide

This Weather App has been configured to deploy securely on Netlify using serverless functions to protect the OpenWeatherMap API key.

## Deployment Steps

### 1. Push your code to GitHub

First, push your code to a GitHub repository.

### 2. Connect to Netlify

1. Sign up or log in to [Netlify](https://www.netlify.com/)
2. Click "New site from Git"
3. Select your GitHub repository
4. Configure build settings:
   - Build command: Leave empty (no build step needed)
   - Publish directory: `.` (root directory)

### 3. Set Environment Variables

After deploying, you need to set up your API key as an environment variable:

1. Go to Site settings > Environment variables
2. Add a new variable:
   - Key: `OPENWEATHERMAP_API_KEY`
   - Value: Your OpenWeatherMap API key

### 4. Trigger Redeploy

After setting the environment variable, trigger a redeploy of your site to ensure the serverless function can access the API key.

## How It Works

- The app uses a Netlify serverless function (`/functions/weather.js`) to make API calls to OpenWeatherMap
- The API key is stored as an environment variable in Netlify, not in the client-side code
- API requests are proxied through the `/api/weather` endpoint, which maps to the serverless function

## Local Development

To test locally with Netlify functions:

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create a `.env` file in the root directory with: `OPENWEATHERMAP_API_KEY=your_api_key_here`
3. Run `netlify dev`

This will start a local development server that simulates the Netlify environment, including the serverless functions.