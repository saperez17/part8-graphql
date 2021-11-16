import React from "react";

const BookItem = ({ bookItem }) => {
  return (
    <>
      <tr key={bookItem.title}>
        <td>{bookItem.title}</td>
        <td>{bookItem.author.name}</td>
        <td>{bookItem.published}</td>
      </tr>
    </>
  );
};

const BookList = ({ bookList }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((book) => (
              <BookItem bookItem={book} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;