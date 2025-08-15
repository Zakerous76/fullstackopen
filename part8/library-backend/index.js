const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
require("dotenv").config()
const mongoose = require("mongoose")
const User = require("./models/user")
const createBookCountLoader = require("./loaders/bookCountLoader")
const jwt = require("jsonwebtoken")
const typeDefs = require("./graphql/schema")
const resolvers = require("./graphql/resolvers")

const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/use/ws")
const { expressMiddleware } = require("@as-integrations/express5")
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error)
  })

const start = async () => {
  const app = express()

  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer(
    {
      schema,
      context: async ({ req }) => {
        let currentUser = null

        const auth = req?.headers?.authorization || null
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          try {
            const decodedToken = jwt.verify(
              auth.substring(7),
              process.env.SECRET
            )
            currentUser = await User.findById(decodedToken.id)
          } catch (err) {
            console.error("Invalid or expired token", err)
          }
        }

        return {
          // 8.26: n+1
          loaders: {
            bookCountLoader: createBookCountLoader(),
          },
          currentUser, // This is now a *value*, not a function
        }
      },
    },
    wsServer
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        let currentUser = null

        const auth = req?.headers?.authorization || null
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
          try {
            const decodedToken = jwt.verify(
              auth.substring(7),
              process.env.SECRET
            )
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
    })
  )

  const PORT = process.env.PORT
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start()
