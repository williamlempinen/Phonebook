const DeleteMessage = (props) => {
    const style = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16,
      };

    if (props.message) {
        return (
            <div style={ style }>
                <h1>Deleted</h1>
            </div>
        );
    } else {
        return null;
    }
}

export default DeleteMessage;