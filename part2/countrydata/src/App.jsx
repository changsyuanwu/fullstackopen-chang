import { useState } from 'react'
import Filter from './components/Filter';
import { useEffect } from 'react';
import countriesServices from './services/countries.js';
import Content from './components/Content.jsx';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("")

  useEffect(() => {
    countriesServices.getAll()
      .then(initialData => {
        setCountries(initialData)
      })
  }, [])
  
  const handleFilterChange = (e) => 
    setFilter(e.target.value)

  const onShowButtonClicked = (c) => {
    setFilter(c.name.common)
  }

  const countriesThatMatchFilter =
    filter === ""
      ? countries
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Content countries={countriesThatMatchFilter} onShowButtonClicked={onShowButtonClicked} />
    </div>
  );
};

export default App
