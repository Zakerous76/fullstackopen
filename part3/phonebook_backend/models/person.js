const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

mongoose
  .connect(url)
  .then((res) => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,}-\d+$/.test(v);
      },
      message: `This is not a valid phone number! (2,3 digits)-(the rest) {min 8 digits}`,
    },
    minLength: 8,
    required: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
