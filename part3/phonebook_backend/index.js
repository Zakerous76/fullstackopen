require("dotenv").config();
const express = require("express");
const { format } = require("date-fns");
const morgan = require("morgan");
const PersonModel = require("./models/person");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.static("dist"));

// Morgan logger
app.use(
  morgan((tokens, req, res) => {
    const responseBody = JSON.stringify(res.req.body);
    console.log(responseBody);
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      responseBody,
    ].join(" ");
  })
);

// # Routes

// ROOT
app.get("/", (req, res) => {
  console.log("Say hello to my little friend!!");
  res.status(200).end("Say hello to my little friend!!");
});

// GET persons
app.get("/api/persons", (req, res) => {
  PersonModel.find({})
    .then((phonebook) => {
      console.log(phonebook);
      res.status(200).json(phonebook);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET info
app.get("/info", (req, res) => {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZoneName: "long",
  });

  PersonModel.find({})
    .then((phonebook) => {
      const peopleNum = phonebook.length;
      const formattedTime = format(
        currentTime,
        "eee MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
      );
      const responseString = `Phonebook has info for ${peopleNum} people<p>${formattedTime}</p>`;
      res.status(200).send(responseString);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET a person
app.get("/api/persons/:id", (req, res) => {
  const personId = req.params.id;
  const person = phonebook.find((p) => p.id === personId);
  if (person) {
    res.status(200).json(person);
    return;
  }
  res.status(404).json({ error: `Person with ID:${personId} not found` });
});

// DELETE a person
app.delete("/api/persons/:id", (req, res) => {
  const personId = req.params.id;
  PersonModel.findByIdAndDelete(personId).then((result) => {
    return res.status(204).end();
  });
});

// CREATE a new person
app.post("/api/persons", (req, response) => {
  const body = req.body;
  if (req.headers["content-type"] === "application/json") {
    if (!body.name) {
      console.log("Name missing");
      response.status(400).json({ error: "name missing: enter a name" });
      return;
    }

    if (!body.number) {
      console.log("Number missing");
      response.status(400).json({ error: "number missing: enter a number" });
      return;
    }
    const newName = body.name;
    PersonModel.find({ name: newName }).then((result) => {
      console.log("result:,", result);
      const nameExists = result.length == 0 ? false : true;
      if (nameExists) {
        console.log("Name is not unique");
        response.status(400).json({ error: "name must be unique" });
        return;
      }
      const newPerson = new PersonModel({ ...body });
      newPerson.save().then((savedPerson) => {
        response.status(201).json(savedPerson);
        console.log("personCreated: ", savedPerson);
        return;
      });
    });
  } else {
    console.log("A bad request. Fix content-type.");
    response.status(400).json({ error: "A bad request. Fix content-type." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server Started\nListening to Port ${PORT}.`);
});
