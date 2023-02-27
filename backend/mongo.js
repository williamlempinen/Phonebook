const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const generateId = (Math.random() * 1000).toFixed(0);
const inputName = process.argv[3];
const inputNumber = process.argv[4];

const url = `mongodb+srv://wlempin:${password}@webbis.keell9s.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});
  
const Person = mongoose.model('Person', contactSchema);

const person = new Person({
    id: generateId,
    name: inputName,
    number: inputNumber,
});

if (process.argv.length < 5) {
    console.log("Phonebook:");
    Person.find({})
    .then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    });
} else {
    person.save().then(result => {
        console.log("Added", inputName, inputNumber, "to phonebook");
        mongoose.connection.close();
    });
}
  