import CountryName from "./CountryName"

const CountryList = ({ countries }) => {
  return (
    <>
      {countries.map(c => (
          <CountryName key={c.name.common} country={c} />
      ))}
    </>
  )
}

export default CountryList