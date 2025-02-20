import {
  useQuery,
  useSubscription
} from "@apollo/client";
import { useState } from "react";
import BooksTable from "./BooksTable";
import {
  BOOK_ADDED,
  ALL_BOOKS
} from "../queries";
import { updateCache } from "../utils";

const Books = () => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`Book "${addedBook.title}" added`);
      updateCache(
        client.cache,
        {
          query: ALL_BOOKS,
          variables: {
            genre
          },
        },
        addedBook
      );
    },
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <BooksTable books={result.data.allBooks} />
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
