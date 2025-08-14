const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
})

// Middleware to convert Mongo duplicate key error into a ValidationError
schema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    next(
      new mongoose.Error.ValidationError({
        errors: {
          [field]: {
            message: `${field} must be unique`,
            kind: "unique",
            path: field,
            value: doc[field],
          },
        },
      })
    )
  } else {
    next(error)
  }
})

module.exports = mongoose.model("Book", schema)
