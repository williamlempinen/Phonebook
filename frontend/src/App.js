import { useState } from 'react';
import { useEffect } from 'react';
import Form from './components/Form';
import Numbers from './components/Numbers';
import AddMessage from './components/AddMessage';
import DeleteMessage from './components/DeleteMessage';
import contactService from "./services/contacts";

const App = () => {
    
  const [ persons, setPersons ] = useState([]);
  const [ name, setName ] = useState("");
  const [ number, setNumber ] = useState("");
  const [ addMessage, setAddMessage ] = useState(false);
  const [ deleteMessage, setDeleteMessage ] = useState(false);

  useEffect(() => {
    console.log("eka");
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

      setAddMessage(true);
      setTimeout(() => {
        setAddMessage(false);
      }, 2000);
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
      setTimeout(() => {
        setDeleteMessage(false);
      }, 2000);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddMessage message={ addMessage } />
      <DeleteMessage message={ deleteMessage } />
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