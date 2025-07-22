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
  number: String,
});

module.exports = mongoose.model("Person", personSchema);
