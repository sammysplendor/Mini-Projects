import "./ForecastCard.css";

const HourlyForecast = ({ forecastData }) => {
  const time = forecastData?.dt_txt;
  const timeObj = new Date(time);
  const hourly = timeObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: "true",
  });

  const iconCode = forecastData?.weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  return (
    <div className="hourlyForcast">
      <span>
        <img src={weatherIcon} alt={forecastData?.weather[0]?.description} />

        <h4>{hourly}</h4>
      </span>

      <p>{forecastData?.main?.temp}</p>
    </div>
  );
};

export default HourlyForecast;
