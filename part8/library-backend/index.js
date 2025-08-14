const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const book = require("./models/book")
const author = require("./models/author")
const createBookCountLoader = require("./loaders/bookCountLoader")
const { GraphQLBoolean, GraphQLError } = require("graphql")

const typeDefs = `
  type Author {
    name: String
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
    bookCount: async () => (await Book.find({})).length,
    authorCount: async () => (await Author.find({})).length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate("author")
      }
      if (args.author && !args.genre) {
        const theAuthor = await Author.findOne({ name: args.author })
        if (!theAuthor) {
          return null
        }
        return await Book.find({ author: theAuthor }).populate("author")
      }
      if (!args.author && args.genre) {
        const allBooks = await Book.find({}).populate("author")
        return allBooks.filter((b) => b.genres.includes(args.genre))
      }
      const theAuthor = await Author.findOne({ name: args.author })
      if (!theAuthor) {
        return null
      }
      const theAuthorGenreBooks = await Book.find({
        author: theAuthor,
      }).populate("author")
      return theAuthorGenreBooks.filter((b) => b.genres.includes(args.genre))
    },
    allAuthors: async () => {
      // 1. Get all authors
      const authors = await Author.find({})

      // 2. Aggregate book counts for all authors in one query
      const bookCounts = await Book.aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } },
      ])

      // 3. Create a lookup map
      const countMap = {}
      bookCounts.forEach((entry) => {
        countMap[entry._id.toString()] = entry.count
      })

      // 4. Return authors with bookCount directly
      return authors.map((author) => ({
        name: author.name,
        id: author._id,
        born: author.born,
        bookCount: countMap[author._id.toString()] || 0,
      }))
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
  },
  Author: {
    bookCount: async (root, args, { loaders }) => {
      const authorId = mongoose.Types.ObjectId.isValid(root.id)
        ? new mongoose.Types.ObjectId(root.id)
        : root.id

      return loaders.bookCountLoader.load(authorId)
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let theAuthor = await Author.findOne({ name: args.author })
      try {
        if (!theAuthor) {
          theAuthor = await new Author({ name: args.author }).save()
        }

        const newBook = new Book({
          title: args.title,
          author: theAuthor._id,
          published: args.published,
          genres: args.genres,
        })

        await newBook.save()
        return newBook
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
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
  context: async () => ({
    loaders: {
      bookCountLoader: createBookCountLoader(),
    },
  }),
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
