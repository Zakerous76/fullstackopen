const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/user")
const createBookCountLoader = require("./loaders/bookCountLoader")
const jwt = require("jsonwebtoken")
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")

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
