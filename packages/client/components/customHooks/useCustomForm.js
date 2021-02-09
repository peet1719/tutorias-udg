import {useState, useEffect, useRef} from 'react';

const useCustomForm = ({initialValues, onSubmit}) => {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [onSubmitting, setOnSubmitting] = useState(false);

    const formRendered = useRef(true);

    useEffect(() => {
        if(formRendered.current ){
            setValues(initialValues);
            setErrors({});
            setOnSubmitting(false);
        }
        formRendered.current = false
    },[initialValues]);

    const handleChange = (event) => {
        const { target } = event;
        const {name, value} = target;
        event.persist();
        setValues({...values, [name]: value});
    }

    const handleSubmit =(event) => {
        if(event) event.preventDefault()
        setErrors({...errors})
        onSubmit({values, errors})
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}

export default useCustomForm;