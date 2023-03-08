const Form = (props) => {
  return (
      <form>
        <div>
          <p>
            <label htmlFor="name"><b>Name: </b></label>
            <input id="name" onChange={ props.handleName } value={ props.name } required/>
          </p> 
          <p>
            <label htmlFor="number"><b>Number: </b></label>
            <input id="number" onChange={ props.handleNumber } value={ props.number } required/>
          </p>
          <div className="add-container">
            <button className="add-button" onClick={ props.addContact } type="submit">Add</button> 
          </div>
        </div>
      </form>
  );
}

export default Form;