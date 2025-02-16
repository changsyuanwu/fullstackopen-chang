import { useQuery } from "@apollo/client";
import {
  useState,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import { ALL_BOOKS, CURRENT_USER } from "../queries";
import BooksTable from "./BooksTable";

const Recommendations = () => {
  const navigate = useNavigate();
  const [favouriteGenre, setFavouriteGenre] = useState(null);
  const user = useQuery(CURRENT_USER);
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: favouriteGenre
    },
  });

  useEffect(() => {
    if (user.data && user.data.me) {
      setFavouriteGenre(user.data.me.favouriteGenre);
    }
  }, [user.data]);

  if (user.loading || books.loading) {
    return <div>loading...</div>
  }

  if (!user.data.me) {
    navigate("/");
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre: <b>{favouriteGenre}</b>
      </p>
      <BooksTable books={books.data.allBooks} />
    </div>
  );
};

export default Recommendations;