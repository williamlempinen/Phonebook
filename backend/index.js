//*routeissa olevat kommentit pitävät sisällään aikaisempia toteutuksia
//*suosittelen pienentämään ne luettavuuden vuoksi

require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

const checkNames = (personToBeAdded) => {
  let personName = personToBeAdded.name;
  return persons.every(person => personName !== person.name);
}

const checkNumbers = (personToBeAdded) => {
  let personNumber = personToBeAdded.number;
  return persons.every(person => personNumber !== person.number);
}

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
  ];

const date = new Date();  
let howMany = persons.length;
let info = `Phonebook has info for ${howMany} people`;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  //*aikaisemmissa tehtävissä käytetty tapa
  //*res.json(persons);

  //!uusi toteutus
    Person.find({})
    .then(result => {
      res.json(result);
    });
});

app.get("/api/info", (req, res) => {
    res.send(info + "<br />" +  date);
});

app.get('/api/persons/:id', (req, res, next) => {
  //*aikaisemmissa tehtävissä käytetty tapa
  //*const id = Number(req.params.id);
  //*const person = persons.find(person => person.id === id);
  //*
  //*if (person) {
  //*  res.json(person);
  //*} else {
  //*  res.status(404).end();
  //*}

  //!uusi toteutus
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  })
  .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  //*aikaisemmissa tehtävissä käytetty tapa
  //*const id = Number(req.params.id);
  //*persons = persons.filter(person => person.id !== id);
  //*res.status(204).end();
  Person.findByIdAndRemove(req.params.id)
  .then(person => {
    res.status(204).end();
  })
  .catch(error => next(error));
});

app.post("/api/persons", (req, res) => {
  //*tapa, jolla luotiin uusi id henkilölle aikaisemmissa tehtävissä
  //*const newId = (Math.random() * 1000).toFixed(0);
  const body = req.body;
  console.log(body);

  const newPerson = new Person({
    //*id: Number(newId),
    name: body.name,
    number: body.number
  });

  let bool1 = checkNames(newPerson);
  let bool2 = checkNumbers(newPerson);
  let nameLen = newPerson.name.length;
  let numLen = newPerson.number.length;

  if (bool1 === false || bool2 === false || nameLen < 2 || numLen < 7) {
    return (
      res.status(400).json({
        error: "name or number is missing or is not unique"
      })
    );
  } else {
    //*aikaisemmissa tehtävissä käytetty tapa
    //*persons = persons.concat(newPerson);
    //*res.json(newPerson);
    //*console.log(req.headers);

    //!uusi toteutus
    newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson);
    });
  }

  console.log(newPerson);
  res.json(newPerson);
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "couldn't find an existing contact" });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})