const mongoose = require("mongoose");

const databaseName = "phonebook";

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PersonModel = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log("Please provide a password");
  process.exit(1);
} else {
  const password = process.argv[2];
  const url = `mongodb+srv://fullstackopen:${password}@cluster0.ilombjs.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.connect(url);
  // display all entries
  if (process.argv.length < 4) {
    PersonModel.find({}).then((res) => {
      res.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  } else {
    const personName = process.argv[3];
    let personNumber = "";

    if (process.argv.length > 4) {
      personNumber = process.argv[4];
    }
    const personObj = PersonModel({
      name: personName,
      number: personNumber,
    });
    personObj.save().then((res) => {
      console.log("res: ", res);
      console.log("Person is saved");
      mongoose.connection.close();
    });
  }
}
