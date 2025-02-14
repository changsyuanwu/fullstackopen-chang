import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";
import BooksTable from "./BooksTable";

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
      <BooksTable books={result.data.allBooks} genre={genre} />
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
