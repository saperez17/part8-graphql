import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from 'queries';
import { updateCacheWith } from 'utils';
import { useApolloClient } from '@apollo/client';

const NewBook = (props) => {
  const [title, setTitle] = useState('New book here');
  const [author, setAuthor] = useState('santiago');
  const [published, setPublished] = useState('2020');
  const [genre, setGenre] = useState('code');
  const [genres, setGenres] = useState(['code']);
  const client = useApolloClient();

  const [ addBook ] = useMutation(ADD_BOOK,{
    // refetchQueries: [{ query: ALL_BOOKS, variables: { genre:"" } }],
    update: (store, response) => {
        updateCacheWith(response.data.addBook, client);
    },
    onError: (error) => {
         console.log(error);   
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
    addBook({ variables: { title, author, published:parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
