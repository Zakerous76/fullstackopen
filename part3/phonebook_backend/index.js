const express = require("express");
const { format } = require("date-fns");
const PORT = 3001;

const app = express();
app.use(express.json());

const phonebook = [
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

// Start server
app.listen(PORT, () => {
  console.log(`Server Started\nListening to Port ${PORT}.`);
});
