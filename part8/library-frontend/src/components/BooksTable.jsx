/* eslint-disable react/prop-types */

const BooksTable = ({ books, genre }) => {
  
  if (!books) {
    return null;
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books
          .filter((b) => !genre || b.genres.includes(genre)) // If no genre is selected, show all books
          .map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BooksTable;