const Numbers = (props) => {
return (
    <div>
      <ul>
        { props.persons.map( person => {
        return (
          <li id={ person.id } key={ person.id }><b>{ person.name } , { person.number }</b>
          <br />
          <button onClick={ props.handleDelete }>Delete</button>
          </li>
        );
      })}
      </ul>
    </div>
    );
}

export default Numbers;