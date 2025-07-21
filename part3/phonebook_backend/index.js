const express = require("express");
const { format } = require("date-fns");
const morgan = require("morgan");

const PORT = 3001;

const app = express();
app.use(express.json());

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

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Generate ID helper function
const generateID = () => {
  const id = Math.floor(Math.random() * 1000000);
  return id;
};

// # Routes

// ROOT
app.get("/", (req, res) => {
  console.log("Say hello to my little friend!!");

  res.status(200).end("Say hello to my little friend!!");
});

// GET persons
app.get("/api/persons", (req, res) => {
  res.status(200).json(phonebook);
});

// GET info
app.get("/info", (req, res) => {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZoneName: "long",
  });

  const peopleNum = phonebook.length;

  const formattedTime = format(
    currentTime,
    "eee MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
  );
  const responseString = `Phonebook has info for ${peopleNum} people<p>${formattedTime}</p>`;

  res.status(200).send(responseString);
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
  const person = phonebook.find((p) => p.id === personId);
  if (person) {
    phonebook = phonebook.filter((p) => p.id !== personId);
    res.status(200).json({
      delete: "success",
      deletedPerson: person,
    });
    console.log("New Phonebook:", phonebook);
    return;
  }
  res.status(404).json({
    delete: "fail",
    message: `Person with ID: ${personId} does not exist`,
  });
  return;
});

// CREATE a new person
app.post("/api/persons", (req, res) => {
  const body = req.body;
  const id = generateID();
  if (req.headers["content-type"] === "application/json") {
    if (!body.name) {
      console.log("Name missing");
      res.status(400).json({ error: "name missing: enter a name" });
      return;
    }

    if (!body.number) {
      console.log("Number missing");
      res.status(400).json({ error: "number missing: enter a number" });
      return;
    }

    const nameExists = phonebook
      .map((person) => person.name.toLowerCase())
      .includes(body.name);

    console.log("nameExists: ", nameExists);
    if (nameExists) {
      console.log("Name is not unique");
      res.status(400).json({ error: "name must be unique" });
      return;
    }

    const newPerson = { ...body, id };
    phonebook = phonebook.concat(newPerson);
    res.status(201).json(newPerson);
    console.log("personCreated: ", newPerson);
    return;
  }
  console.log("A bad request. Fix content-type.");
  res.status(400).json({ error: "A bad request. Fix content-type." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server Started\nListening to Port ${PORT}.`);
});
