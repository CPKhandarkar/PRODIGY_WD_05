// API key 
const API_KEY = "fe596a503d47e32e59ad24e672fb26da";

if (document.getElementById("current-location")) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      document.getElementById("current-location").textContent = `Lat: ${latitude}, Lon: ${longitude}`;
    },
    (error) => {
      document.getElementById("current-location").textContent = "Location access denied.";
    }
  );
}

document.getElementById("location-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location").value;
  localStorage.setItem("location", location);
  window.location.href = "weather.html";
});

if (window.location.pathname.endsWith("weather.html")) {
  const location = localStorage.getItem("location");

  async function fetchWeather(location) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
  
    if (response.ok) {
      const { main, wind, visibility, sys, weather, rain } = data;
  
      document.getElementById("location-name").textContent = `Location: ${data.name}`;
  
      document.getElementById("temperature").textContent = main.temp;
      document.getElementById("rain").textContent = rain ? `${rain["1h"] || 0} mm` : "No rain";
      document.getElementById("wind-speed").textContent = wind.speed;
      document.getElementById("visibility").textContent = visibility / 1000;
      document.getElementById("pressure").textContent = main.pressure;
      document.getElementById("humidity").textContent = main.humidity;
  
      const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();
      document.getElementById("sunset").textContent = sunsetTime;
  
      const precipitation = rain ? rain["1h"] || "Not available" : "Not available";
      document.getElementById("precipitation").textContent = precipitation;
    } else {
      document.getElementById("location-name").textContent = "Error fetching weather data.";
    }
  }
  
  fetchWeather(location);
  
}
