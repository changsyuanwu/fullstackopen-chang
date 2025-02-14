import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks
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
      {result.data.allBooks.length > 0 && (
        <div>
          {Array.from(
            new Set(result.data.allBooks.flatMap((b) => b.genres))
          ).map((g) => (
            <button key={g} onClick={() => setGenre(g)}>{g}</button>
          ))}
          <button onClick={() => setGenre(null)}>all genres</button>
        </div>
      )}
    </div>
  );
};

export default Books;
