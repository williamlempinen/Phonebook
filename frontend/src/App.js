import { useState } from 'react';
import { useEffect } from 'react';
import Form from './components/Form';
import Numbers from './components/Numbers';
import contactService from "./services/contacts";

const App = () => {
    
  const [ persons, setPersons ] = useState([]);
  const [ name, setName ] = useState("");
  const [ number, setNumber ] = useState("");

  useEffect(() => {
    contactService
    .getContacts()
    .then(contacts => {
        setPersons(contacts);
    })
    .catch(error => {
        console.log(error);
    });
  }, []);

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleNumber = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  }

  const addContact = (e) => {
    e.preventDefault();
    const newContact = {
      name: name,
      number: number
    };

    const value = persons.find(person => person.name === name);
    const nameLen = newContact.name.length;
    const numberLen = newContact.number.length;
    const numberType = Number(newContact.number);
    if (value) {
      alert(`${name} already in phonebook`);
    } else if (nameLen < 2) {
      alert("Name should be at least two characters long!");
    } else if (numberLen < 7 || !numberType) {
      alert("Invalid phonenumber! Your phonenumber should be at least 7 characters long and contain only numbers.");
    } else {
      contactService
      .createContacts(newContact)
      .then(contact => {
          setPersons(persons.concat(contact));
          setName("");
          setNumber("");
      });
    }
  }

  const handleDelete = (e) => {
    let deleteId = e.target.parentNode.id;
    if (window.confirm("Are you sure you want to delete this contact?")) {
      contactService
      .deleteContacts(deleteId)
      .then(() => {
        contactService
        .getContacts()
        .then(initialContacts => {
          setPersons(initialContacts)
        });
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form 
      handleName={ handleName }
      name={ name }
      handleNumber={ handleNumber }
      number={ number }
      addContact={ addContact }/>
      
      <h2>Numbers</h2>
      <Numbers 
      persons={ persons }
      handleDelete={ handleDelete }/>
    </div>
  );
}

export default App;