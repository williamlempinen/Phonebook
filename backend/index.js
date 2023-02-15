const express = require('express');
const app = express();

app.use(express.json());

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
  ]

const date = new Date();  
let howMany = persons.length;
let info = `Phonebook has info for ${howMany} people`;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get("/api/info", (req, res) => {
    res.send(info + "<br />" +  date);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const newId = (Math.random() * 1000).toFixed(0);
  const body = req.body;
  
  if (!body.content) {
    return (
      res.status(400).json({
        error: "content missing"
      })
    );
  } else if (body.name) {

  } else {
    const newPerson = {
      id: newId,
      name: body.name,
      number: body.number
    };

    persons = persons.concat(newPerson);

    res.json(newPerson);
    console.log(req.headers);
  }

  console.log(newPerson);
  res.json(newPerson);
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})