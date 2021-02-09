import { useState, useEffect } from 'react';
import styles from './../../assets/styles/main.module.scss';
import useCustomForm from '../customHooks/useCustomForm';
import ErrorComponent from '../alerts/ErrorComponent';
import { errorsVar } from '../../cache';

const EditPasswordCompponent = (props) => {
    const [error, setError] = useState(errorsVar())
    const [confirmar, setConfirmar] = useState("");
    const initialValues = {
        oldPassword: "",
        newPassword: ""
    }

    useEffect(() => {
        setError(errorsVar())

        if (confirmar !== values.newPassword && confirmar !== "") {
            errorsVar("Las contraseñas no coinciden")
            setError(errorsVar())
        } else {
            if (confirmar !== "") {
                errorsVar("")
                setError(errorsVar())
            }
            
}

    })
//request email reset password
const resetPassword = ({ values }) => {
    props.resetPassword({
        variables:
        {
            email: values.email
        }
    })
}
//change password
const changePassword = ({ values }) => {
    props.changePassword({
        variables:
        {
            email: props.email,
            password: values.oldPassword,
            newPassword: values.newPassword
        }
    })
}


const { values,
    errors,
    handleChange,
    handleSubmit
} = useCustomForm({ initialValues, onSubmit: changePassword }
);

const formData = () => {
    return {
        title: "Cambia tu contraseña",
        subtitle: "Escribe tu nueva contraseña",
        id: "oldPassword",
        type: "password",
        placeholder: "Contraseña anterior",
        value: values.oldPassword,
        min: 6
    }
}

const propsForm = formData()

return (
    <div key={props.id} className={styles.container__login}>
        <div className={`${styles.reset_password} ${styles.reset_password_profile}`}>
            <h1 className={styles.reset_password__title}>{propsForm.title}</h1>
            <p className={styles.reset_password__text}>{propsForm.subtitle}</p>
            <form className={styles.reset_password__form} onSubmit={handleSubmit}>
                <div className={styles.form_login__group}>
                    <ErrorComponent>{error}</ErrorComponent>
                </div>
                <div className={styles.form_login__group}>
                    <FormField
                        id={propsForm.id}
                        type={propsForm.type}
                        placeholder={propsForm.placeholder}
                        formOnChange={handleChange}
                        value={propsForm.value}
                        min={propsForm.min}
                    />
                    <FormField
                        id="newPassword"
                        type="password"
                        placeholder="Nueva contraseña"
                        formOnChange={handleChange}
                        value={values.newPassword}
                        min={propsForm.min}
                    />
                    <FormField
                        id="confirmarPassword"
                        type="password"
                        placeholder="Confirmar Contraseña"
                        formOnChange={(e) => setConfirmar(e.target.value)}
                        value={confirmar}
                        min={propsForm.min}
                    />


                    {/* <input
                            className={styles.form_login__input}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            required
                            onChange={handleChange}
                            value={values.email}
                            onFocus={() => { errorsVar('') }}
                        /> */}
                    {/* <label htmlFor="email" className={styles.form_login__label}>E-mail</label> */}
                </div>
                <div className={styles.form_login__group}>
                    <input className={`${styles.btn} ${styles.btn__primary}`} type="submit" value="Enviar" name="submit" />
                </div>
            </form>
        </div>
    </div>
)
}

const FormField = (props) => {
    return (
        <div className={styles.form_login__group}>
            <input
                className={styles.form_login__input}
                id={props.id}
                type={props.type}
                name={props.id}
                placeholder={props.placeholder}
                required
                value={props.value}
                onChange={props.formOnChange}
                minLength={props.min}
                onFocus={() => { errorsVar('') }}
            />
            <label htmlFor={props.id} className={styles.form_login__label}>{props.placeholder}</label>
        </div>
    )
}

export default EditPasswordCompponent;