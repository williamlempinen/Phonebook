import { useState } from 'react';

const Form = (props) => {
  return (
    <div>
      <form onSubmit={ props.handleSubmit }>
        <div>
          Name: <input onChange={ props.handleName } value={ props.name } required/>
          <br />
          Phone number: <input onChange={ props.handleNumber } value={ props.number } required/>
        </div>
        <div>
          <button type="submit">Add</button>
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
  const [ persons, setPersons ] = useState([{name: "Arto Hellas", number: 123123123}]);
  const [ name, setName ] = useState("");
  const [ number, setNumber ] = useState("");

  const handleName = (e) => {
    e.preventDefault()
    setName(e.target.value);
  }

  const handleNumber = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = persons.find(person => person.name === name);
    if ( value ) {
      alert(`${name} already in phonebook`)
    } else {
      setPersons(persons.concat({ name: name, number: number }));
      setName("");
      setNumber("");
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
      handleSubmit={ handleSubmit }/>
      <h2>Numbers</h2>
      <Number persons={ persons }/>
    </div>
  );
}

export default App;