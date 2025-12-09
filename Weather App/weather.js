// ========== WEATHER APP FUNCTIONALITY ========== //

const weatherButton = document.getElementById("get-weather-btn");
const clearButton = document.getElementById("clear-btn");
const apiKey = "d43a3bce0a9b6cceac8b7a75978ec956";

weatherButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const city = document.getElementById("city-name").value;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(URL);
    console.log(response);
    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      return;
    }
    const data = await response.json();
    console.log(data);
    const weatherDisplay = document.querySelector(".weather-display");
    if (data.cod === "404") {
      weatherDisplay.innerHTML = "City not found";
      weatherDisplay.style.color = "red";
      return;
    }

    const weatherHTML = `
    <h2>${data.name}</h2>
     <h3>${data.main.temp}℃</h3>
      <p>${data.name}, ${data.sys.country}</p>
       <p>${data.weather[0].description}</p>
       <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />

    `;
    weatherDisplay.innerHTML = weatherHTML;
  } catch (error) {
    console.error(error);
    weatherDisplay.innerText = "Error fetching data";
  }
});

clearButton.addEventListener("click", () => {
  const weatherDisplay = document.querySelector(".weather-display");
  weatherDisplay.innerHTML = "";
});
