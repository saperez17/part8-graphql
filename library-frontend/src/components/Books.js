import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from 'queries';

const Books = (props) => {

  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS);
  const [ filter, setFilter ] = useState('');

  const onFilterChange = (filterValue) => {
    if (!filterValue){
      setFilter('')
    }
    setFilter(filterValue)
  }

  useEffect(()=>{
    getBooks({ variables: { genre: filter }});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  if (!props.show) {
    return null
  }
  if (loading){
    return <div>...loading</div>
  }

  if (error) return `Error! ${error}`;

  if (!data.allBooks.length) {
    return <div>no results</div>
  }

  const allGenres = data.allBooks.map(book => book.genres).flat().filter((v, i, a) => a.indexOf(v) === i);
  const filteredBooks = !filter
  ? data.allBooks
  : data.allBooks.filter(book => book.genres.includes(filter) ? book : null)

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{!filter ? 'All genres' : filter }</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {allGenres.map(genre =>
          <button key={genre} onClick={() => onFilterChange(genre)}>{genre}</button>)}
          <button onClick={() => setFilter("")}>All genres</button>
      </div>
    </div>
  )
}

export default Books