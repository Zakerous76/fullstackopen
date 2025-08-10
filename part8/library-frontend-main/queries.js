import { gql } from "@apollo/client"

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

export const CREATE_BOOK = gql`
  mutation AddBook(
    $title: String
    $author: String
    $published: Int
    $addBookId: ID
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      id: $addBookId
      genres: $genres
    ) {
      title
      author
      published
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`
