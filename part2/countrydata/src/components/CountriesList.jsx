import CountryName from "./CountryName"

const CountryList = ({ countries, onShowButtonClicked }) => {
  return (
    <>
      {countries.map((c) => (
        <CountryName
          key={c.name.common}
          country={c}
          onShowButtonClicked={onShowButtonClicked}
        />
      ))}
    </>
  );
};

export default CountryList