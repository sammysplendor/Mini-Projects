import { api } from "./axiosInstance";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeatherBycity = async (city) => {
  try {
    const response = await api.get("/weather", {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await api.get("/weather", {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

export const getDailyForecast = async (city) => {
  try {
    const response = await api.get("/forecast", {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly weather forecast:", error);
  }
};

export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await api.get("/forecast", {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};
