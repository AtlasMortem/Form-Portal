// Weather Widget
// This is a simple weather widget that fetches weather data from the OpenWeatherMap API based on user input.
const apiKey = "fd01852d2ea558adf26f77253840b14c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";
// The API key and URL are used to fetch weather data from OpenWeatherMap.
// The search box, button, and weather icon are selected from the HTML document.
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// When the button is clicked, it calls the checkWeather function with the value from the search box.
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
// I have had persistent issues resolving a TypeError that popped up for the searchBtn event listener. I have tried to resolve it by checking the console for errors, but I am still having issues.

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    // If the response status is 404, it means the city was not found.
    // In that case, display an error message and hide the weather information.
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {
        // If the city is found, parse the response data and display the weather information.
        // The data includes the city name, temperature, humidity, wind speed, and weather condition.
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " mph";
        // The weather condition is used to determine which icon to display.
        // Different icons are displayed based on the weather condition (e.g., clouds, clear, rain, etc.).
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "media/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "media/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "media/rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "media/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "media/snow.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "media/drizzle.png";
        } else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "media/thunderstorm.png";
        }
        // Finally, display the weather information and hide the error message.
        // The weather information is displayed in a div with the class "weather", and the error message is hidden.
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Feedback sound for form submission
// Create constants for the form and feedback sound elements
const myForm = document.querySelector(".myForm");
const feedbackSound = document.getElementById("ding");

myForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Get the form data and create a mailto link
    setTimeout(() => {
        feedbackSound.play(); // play audio after "submission"
        alert('Form submitted successfully!');
      }, 300);
});