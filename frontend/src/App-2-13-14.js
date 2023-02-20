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
    })
  }, []);

  const handleName = (e) => {
    e.preventDefault()
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
    if (value) {
      alert(`${name} already in phonebook`);
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

  //*en saanut toimiaan vaaditulla tavalla, poistaa li-itemin vain näkymästä - ei db.jsonista
  const handleDelete = (e) => {
    console.log("delete button clicked");
    if (window.confirm("Are you sure you want to delete this contact?")) {
      let itemToRemove = e.target.parentNode;
      itemToRemove.remove();
      console.log(itemToRemove);
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