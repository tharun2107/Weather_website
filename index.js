const apiKey = "d4a2514ab7c7369ef472035aad736cf8";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Enter a valid city');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        displayErrorMessage(error.message);
    }
}

function updateWeatherInfo(data) {
   
    document.querySelector('.weather-info').style.display = 'block';
    const cityName = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('temperature').textContent = temp + "°C";
    document.getElementById('humidity').textContent = humidity + "%";
    document.getElementById('windSpeed').textContent = windSpeed + " km/hr";
}

function displayErrorMessage(message) {
   
    document.querySelector('.weather-info').style.display = 'none';
    
    document.querySelector('.error-message').textContent = message;
    
    setTimeout(() => {
        document.querySelector('.error-message').textContent = '';
    }, 2000);
}

const searchButton = document.querySelector(".sear");
searchButton.addEventListener("click", () => {
    const input = document.querySelector("#cityInput").value.trim();
    if (input) {
        checkWeather(input);
    } else {
        console.error("Please enter a city name");
       
    }
});
