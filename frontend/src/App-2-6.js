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
    const person = { name: newName };
    setPersons(persons.concat(person));
    setNewName("");
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          Name: <input onChange={ handleChange } value={ newName }/>
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