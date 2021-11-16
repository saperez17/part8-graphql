import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query allBooks(
    $genre: String
  ){
    allBooks(genre: $genre) {
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      published
      genres
      author {
        id
        name
        born
      }
    }
  }
`;

export const EDIT_AUTHOR_BIRTH_YEAR = gql`
  mutation editAuthorBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      id
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    value
    }
  }
`;

  export const CURRENT_USER = gql`
  query me {
    me {
      id
      username
      favoriteGenre
    }
  }
  `

  export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      genres
      author {
        id
        name
        born
      }
    }
  }
  `
