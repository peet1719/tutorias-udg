
const BasicForm = (props) => {
    
    return(
        <form onSubmit={props.handleSubmit} >
            {props.child}
        </form>   
    )
}

export default BasicForm;