import { useState } from 'react';

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
      <form onSubmit={ handleSubmit }>
        <div>
          Name: <input onChange={ handleName } value={ name } required/>
          <br />
          Phone number: <input onChange={ handleNumber } value={ number } required/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { persons.map((person, index) => {
          return <li key={ index }><b>{ person.name }</b>, phone. { person.number }</li>
        }) }
      </ul>
    </div>
  );
}

export default App;