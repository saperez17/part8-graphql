import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../queries";
import BookList from 'components/BookList';

const Recommendations = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const userResult = useQuery(CURRENT_USER);

  if (!props.show) {
    return null;
  }

  if (userResult.loading){
      return <div>...loading</div>
  }

  const recommendeBooks = booksResult.data.allBooks.filter((book) =>
    book.genres.includes(userResult.data.me.favoriteGenre) ? book : null
  );
  return (
    <div>
      <h2>Recommendations</h2>
      {userResult.data.me.favoriteGenre ? (
        <p>
          Books in your favourite genre{" "}
          <b>{userResult.data.me.favoriteGenre}</b>{" "}
        </p>
      ) : (
        <p>You have no registered a favourite genre</p>
      )}

      <div>
        {!recommendeBooks.length ? (
          <p>Ops, we couldn't find books in that genre category</p>
        ) : (
         <BookList bookList={recommendeBooks} />
        )}
      </div>
    </div>
  );
};

export default Recommendations;
