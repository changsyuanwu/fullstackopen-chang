export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (arr) => {
    let seen = new Set();
    return arr.filter((item) => {
      let t = item.title;
      return seen.has(t) ? false : seen.add(t);
    });
  };

  cache.updateQuery(
    query,
    ({ allBooks }) => {
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      };
    }
  );
};