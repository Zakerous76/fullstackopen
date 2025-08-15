const mongoose = require("mongoose")
const User = require("../models/user")
const Author = require("../models/author")
const Book = require("../models/book")
const jwt = require("jsonwebtoken")
const { GraphQLError } = require("graphql")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

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
    id: (root) => root._id.toString(),
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

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
