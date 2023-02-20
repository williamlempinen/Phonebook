import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Form = (props) => {
  return (
    <div>
      <form>
        <div>
          Name: <input onChange={ props.handleName } value={ props.name } required/>
          <br />
          Phone number: <input onChange={ props.handleNumber } value={ props.number } required/>
        </div>
        <div>
          <button onClick={ props.addContact } type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

const Person = (props) => {
  return (
    <>
      <p>{ props.name }, phone. { props.number }</p>
    </>
  );
}

const Number = (props) => {
  return (
    <div>
      <ul>
        { props.persons.map((person, index) => {
          return <li key={ index }><b><Person name={ person.name } number={ person.number }/></b></li>
        }) }
      </ul>
    </div>
  );
}




const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ name, setName ] = useState("");
  const [ number, setNumber ] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
        setPersons(response.data);
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
    const contact = {
      name: name,
      number: number
    };
    const value = persons.find(person => person.name === name);
    if (value) {
      alert(`${name} already in phonebook`);
    } else {
      axios
      .post('http://localhost:3001/persons', contact)
      .then(response => {
        setPersons(persons.concat(response.data));
        setName("");
        setNumber("");
        console.log(response);
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
      <Number persons={ persons }/>
    </div>
  );
}

export default App;