import "./ForecastCard.css";

const DailyForecastCard = ({ forecastData }) => {
  const date = forecastData?.dt_txt;
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

  const iconCode = forecastData?.weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="forecastCard">
      <h4>{dayName}</h4>

      <img src={weatherIcon} alt={forecastData?.weather[0]?.description} />

      <span>
        <small>{forecastData?.weather[0]?.description}</small>{" "}
        <small>{Math.round(forecastData?.main?.temp)}°C</small>
      </span>
    </div>
  );
};

export default DailyForecastCard;
