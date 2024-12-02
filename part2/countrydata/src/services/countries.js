import axios from "axios";
const countryDataURL = "https://studies.cs.helsinki.fi/restcountries";
const openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?";

const getAll = () => {
  const request = axios.get(
    `${countryDataURL}/api/all`
  );
  return request.then((response) => response.data);
};

const getWeatherData = (country) => {
  const request = axios.get(
    `${openWeatherURL}lat=${country.capitalInfo.latlng[0]}&lon=${
      country.capitalInfo.latlng[1]
    }&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`
  )
  return request.then(res => res.data)
}

export default { getAll, getWeatherData };
