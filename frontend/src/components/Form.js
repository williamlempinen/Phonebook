const Form = (props) => {
  return (
    <div>
      <form>
          <p>
            <label for="name">Name: </label>
            <input id="name" onChange={ props.handleName } value={ props.name } required/>
          </p> 
          <p>
            <label for="number">Number: </label>
            <input id="number" onChange={ props.handleNumber } value={ props.number } required/>
          </p>
          <button className="add-button" onClick={ props.addContact } type="submit">Add</button> 
      </form>
    </div>
  );
}

export default Form;