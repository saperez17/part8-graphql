import React, { useState } from "react";
import Authors from "components/Authors";
import Books from "components/Books";
import NewBook from "components/NewBook";
import Login from "components/Login";
import Recommendations from "components/Recommendations";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED } from 'queries';
import { updateCacheWith } from 'utils';
const getToken = () => localStorage.getItem("libraryapp-user-token");

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(getToken());
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.data){
        // console.log('subscriptionData.data.bookAdded', subscriptionData.data.bookAdded);
        updateCacheWith(subscriptionData.data.bookAdded, client);
      }
    }
  })
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} />

      {!token && <Login show={page === "login"} setToken={setToken} />}
    </div>
  );
};

export default App;
