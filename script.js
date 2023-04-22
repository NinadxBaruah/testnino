// Get DOM elements
function initMap() {
  // Set the latitude and longitude for the center of the map
  const center = { lat: 37.7749, lng: -122.4194 };

  // Create a new Google Map object and set options
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: center,
  });

  // Add a marker to the map
  const marker = new google.maps.Marker({
    position: center,
    map: map,
  });

  // Add an info window to the marker
  const infowindow = new google.maps.InfoWindow({
    content: "This is the center of the map!",
  });

  // Add a click listener to the marker that opens the info window
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}

const fetchDataBtn = document.getElementById("fetch-data-btn");
const mapContainer = document.querySelector(".map-container");
const weatherDataContainer = document.querySelector(".weather-data-container");
const weatherData = document.getElementById("weather-data");

// API key and API URL
const apiKey = "74883da85b4020b5b4ae85e16f374564";
let latitude;
let longitude;

// Fetch weather data from API
function fetchWeatherData() {
  // Get current location coordinates using Geolocation API
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // Display Google map of current location
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 8,
      });

      // Construct API URL with current location coordinates and API key
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily,alerts&appid=${apiKey}`;

      // Fetch weather data from OpenWeatherMap API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Display weather data on the page
          weatherData.innerHTML = `
            <p><strong>Current Temperature:</strong> ${data.current.temp} &#8451;</p>
            <p><strong>Feels Like:</strong> ${data.current.feels_like} &#8451;</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_speed} m/s</p>
          `;
          // Show weather data container
          weatherDataContainer.style.display = "block";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    (error) => {
      console.error("Error:", error);
    }
  );
}

// Attach event listener to Fetch Data button
fetchDataBtn.addEventListener("click", fetchWeatherData);
