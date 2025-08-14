const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const createBookCountLoader = require("./loaders/bookCountLoader")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
    me: (root, args, context) => {
      return context.currentUser // just return the user from context
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
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("User not logged in", {
          extensions: { code: "UNAUTHENTICATED" },
        })
      }

      let theAuthor = await Author.findOne({ name: args.author })
      console.log("theAuthor:", theAuthor)
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
        return newBook.populate("author")
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
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("User not logged in", {
          extensions: { code: "UNAUTHENTICATED" },
        })
      }
      const setToBorn = args.setBornTo
      const name = args.name
      const author = await Author.findOne({ name })
      if (!author) {
        throw new GraphQLError(`Author ' ${name} ', does not exist`)
      }
      author.born = setToBorn
      return await author.save()
    },
    createUser: async (root, args) => {
      const username = args.username
      const favoriteGenre = args.favoriteGenre
      const user = new User({ username, favoriteGenre })
      try {
        return await user.save()
      } catch (error) {
        const message =
          error.message === "Validation failed"
            ? "Username must be unique"
            : error.message
        throw new GraphQLError(message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
            error,
          },
        })
      }
    },
    login: async (root, args) => {
      const username = args.username
      const password = args.password
      const user = await User.findOne({ username })
      try {
        if (user && password === "password") {
          const userForToken = {
            username,
            id: user.id,
          }
          return { value: jwt.sign(userForToken, process.env.SECRET) }
        } else {
          throw new GraphQLError("Wrong credentials Bhai Sahb", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          })
        }
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        })
      }
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
  context: async ({ req }) => {
    let currentUser = null

    const auth = req?.headers?.authorization || null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
        currentUser = await User.findById(decodedToken.id)
      } catch (err) {
        console.error("Invalid or expired token", err)
      }
    }

    return {
      loaders: {
        bookCountLoader: createBookCountLoader(),
      },
      currentUser, // This is now a *value*, not a function
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
