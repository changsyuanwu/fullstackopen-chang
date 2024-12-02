import CountryList from "./CountriesList";
import CountryDetails from "./CountryDetails";

const Content = ({ countries, onShowButtonClicked, getWeatherData }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  else if (countries.length > 1)
    return (
      <CountryList
        countries={countries}
        onShowButtonClicked={onShowButtonClicked}
      />
    );
  else if (countries.length === 1) {
    const country = countries[0];
    return <CountryDetails country={country} getWeatherData={getWeatherData} />;
  }
};

export default Content