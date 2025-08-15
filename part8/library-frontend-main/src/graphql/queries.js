import { gql } from "@apollo/client"

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
  }
`

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const GET_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
      author {
        ...AuthorDetails
      }
    }
  }
  ${AUTHOR_DETAILS}
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation AddBook(
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
      ...BookDetails
      author {
        ...AuthorDetails
      }
    }
  }
  ${AUTHOR_DETAILS}
  ${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
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
      ...BookDetails
      author {
        ...AuthorDetails
      }
    }
  }
  ${AUTHOR_DETAILS}
  ${BOOK_DETAILS}
`
