const CountryName = ({ country, onShowButtonClicked }) => {
  return (
    <>
      <p>
        {country.name.common}{" "}
        <button onClick={() => onShowButtonClicked(country)}>show</button>
      </p>
    </>
  );
};

export default CountryName;
