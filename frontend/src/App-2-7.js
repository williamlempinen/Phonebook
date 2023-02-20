import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{name: "Arto Hellas"}]);
  const [newName, setNewName] = useState('');

  const handleChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = persons.find(person => person.name === newName);
    if ( value ) {
      alert(`${newName} already in phonebook`)
    } else {
      setPersons(persons.concat({ name: newName }));
      setNewName("");
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          Name: <input onChange={ handleChange } value={ newName } required/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { persons.map((person, index) => {
          return <li key={ index }>{ person.name }</li>
        }) }
      </ul>
    </div>
  );
}

export default App;


