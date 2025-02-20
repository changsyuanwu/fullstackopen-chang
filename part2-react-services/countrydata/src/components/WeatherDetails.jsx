const WeatherDetails = ({ capital, weatherData }) => {
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
      />
      <p>wind {weatherData.wind.speed} m/s</p>
    </>
  );
}

export default WeatherDetails