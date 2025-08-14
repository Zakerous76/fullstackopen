const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const book = require("./models/book")
const author = require("./models/author")

const typeDefs = `
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID
    genres: [String!]!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      id: ID
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books
      }
      if (args.author && !args.genre) {
        return books.filter((b) => b.author === args.author)
      }
      if (!args.author && args.genre) {
        return books.filter((b) => b.genres.includes(args.genre))
      }
      return books.filter(
        (b) => b.author === args.author && b.genres.includes(args.genre)
      )
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter((b) => {
          return b.author === author.name
        }).length
        const result = { ...author, bookCount }
        return result
      })
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
  },
  Mutation: {
    addBook: async (root, args) => {
      let theAuthor = await Author.findOne({ name: args.author })
      if (!theAuthor) {
        theAuthor = await new Author({ name: args.author }).save()
      }

      const newBook = new Book({
        title: args.title,
        author: theAuthor._id,
        published: args.published,
        genres: args.genres,
      })

      try {
        await newBook.save()
        return newBook
      } catch (error) {
        console.log("Error while adding the new book: ", error)
      }
    },
    editAuthor: (root, args) => {
      authors.forEach((a) =>
        a.name === args.name ? (a.born = args.setBornTo) : null
      )
      return authors.find((a) => a.name === args.name)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error)
  })

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
