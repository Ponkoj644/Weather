// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const feelsLike = document.getElementById('feels-like');
const weatherContainer = document.getElementById('weather-container');
const errorMessage = document.getElementById('error-message');

// Hide weather container on page load and show it only after successful search
document.addEventListener('DOMContentLoaded', function () {
    // Initially hide the error message
    errorMessage.classList.add('d-none');

    // Hide weather container by default
    weatherContainer.classList.add('d-none');
});

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Function to fetch weather data
function getWeather() {
    const city = cityInput.value.trim();

    if (city === '') {
        showError('Please enter a city name');
        return;
    }

    // Direct API call to OpenWeatherMap
    const apiKey = '5f472b7acba333cd8a035ea85a0d4d4c'; // Demo API key from OpenWeatherMap docs
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            showError(error.message);
        });
}

// Function to display weather data
function displayWeather(data) {
    // Hide error message if it was shown
    errorMessage.classList.add('d-none');

    // Show weather container
    weatherContainer.classList.remove('d-none');

    // Update weather information
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    weatherContainer.classList.add('d-none');
}