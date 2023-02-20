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

export default Form;