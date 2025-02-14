export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (arr) => {
    let seen = new Set();
    return arr.filter((item) => {
      let n = item.name;
      return seen.has(n) ? false : seen.add(n);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};
