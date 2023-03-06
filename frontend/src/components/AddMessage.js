const AddMessage = (props) => {
    const style = {
        color: 'green',
        fontSize: 16
      };
      
    if (props.message) {
        return (
            <div style={ style }>
                <h1>Added</h1>
            </div>
        );
    } else {
        return null;
    }
}

export default AddMessage;
