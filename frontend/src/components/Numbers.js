const Numbers = (props) => {
  return (
      <div className="numbers-container">
        <ul>
          { props.persons.map( person => {
          return (
            <li id={ person.id } key={ person.id }>
              <u><b>{ person.name } , { person.number }</b></u>
              <br />
              <button className="delete-button" onClick={ props.handleDelete }>Delete</button>
            </li>
          );
        })}
        </ul>
      </div>
      );
  }
  
  export default Numbers;