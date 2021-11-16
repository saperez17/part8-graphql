import { ALL_BOOKS } from 'queries';

export const updateCacheWith = (addedBook, client) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: '' } })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        variables: {
            genre: ''
        }
      })
    }   
  }