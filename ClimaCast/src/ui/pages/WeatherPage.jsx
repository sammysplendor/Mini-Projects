import "../styles/WeatherPage.css";
import { Search, Cloud, Sun } from "lucide-react";
import {
  getWeatherBycity,
  getWeatherByCoords,
  getDailyForecast,
  getForecastByCoords,
} from "../../services/weatherApi";
import { useEffect, useState } from "react";
import DailyForecastCard from "../DailyForecastCard";
import HourlyForecast from "../HourlyForecast";

const WeatherPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showWeather, setShowWeather] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [hourlyList, setHourlyList] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const currentData = await getWeatherByCoords(lat, lon);
          const forecastData = await getForecastByCoords(lat, lon);
          console.log(currentData);
          console.log(forecastData);

          setShowWeather(currentData);

          const hourly = forecastData.list.slice(0, 6);
          setHourlyList(hourly);

          setForecastList(
            forecastData.list.filter((data) =>
              data.dt_txt.includes("09:00:00"),
            ),
          );
        } catch (error) {
          console.error("Couldn't get weather for your location:", error);
        }
      });
    }
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const iconCode = showWeather?.weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const handleCheckWeather = async () => {
    if (!searchInput.trim()) return;

    try {
      const weatherData = await getWeatherBycity(searchInput);
      const forecastData = await getDailyForecast(searchInput);
      console.log(weatherData);
      console.log(forecastData);

      setShowWeather(weatherData);

      const filteredData = forecastData.list.filter((data) =>
        data.dt_txt.includes("09:00:00"),
      );
      setForecastList(filteredData);
    } catch (error) {
      console.error("City not found:", error);
    }
  };

  const handleClear = () => {
    setShowWeather(null);
    setSearchInput("");
  };

  console.log("Current Forecast List:", forecastList);

  return (
    <div className="pageContainer">
      {/* ===== TOPBAR ===== */}
      <nav>
        <span>
          <Cloud className="cloudIcon" fill="#ccddf8" /> ClimaCast
        </span>

        <Sun className="modeIcon" fill="#ccddf8" />
      </nav>

      <div className="pageContent">
        <h2 className="heading">How's the sky looking today?</h2>

        {/* ===== SEARCH BAR ===== */}

        <section className="searchSection">
          <div className="searchBar">
            <Search color="#64748b" className="searchIcon" />
            <input
              type="text"
              placeholder="Enter city here..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheckWeather()}
            />
          </div>

          <div className="btnContainer">
            <button className="weatherBtn" onClick={handleCheckWeather}>
              Check Weather
            </button>
            <button className="clearBtn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </section>

        {/* ===== MAIN CONTENT ===== */}
        <main>
          {showWeather && (
            <div className="weatherDisplay">
              <div className="mainWeatherSections">
                <section className="currentWeather">
                  <div className="city_and_date">
                    <h2>
                      {showWeather.name}, {showWeather.sys.country}
                    </h2>
                    <p>{currentDate}</p>
                  </div>

                  <h1>{Math.round(showWeather.main.temp)}°C</h1>

                  <div className="weatherDescription">
                    <img
                      src={weatherIcon}
                      alt={showWeather.weather[0].description}
                    />

                    <h4>{showWeather.weather[0].description}</h4>
                  </div>
                </section>

                <section className="forecastData">
                  {forecastList.map((day) => (
                    <DailyForecastCard key={day.dt} forecastData={day} />
                  ))}
                </section>
              </div>

              <aside>
                <div className="heading">
                  <h4>Hourly Forecast</h4>

                  <button>
                    <select name="days" id="day-select">
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                      <option value=""></option>
                    </select>
                  </button>
                </div>

                <div className="hourlyCardsContainer">
                  {hourlyList.map((time) => (
                    <HourlyForecast key={time.dt} forecastData={time} />
                  ))}
                </div>
              </aside>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WeatherPage;
