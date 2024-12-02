const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area} km^2</p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((lan) => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </>
  );
}

export default CountryDetails