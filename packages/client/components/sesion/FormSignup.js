import React, { useState, Fragment, useEffect } from 'react';
import styles from './../../assets/styles/main.module.scss'
import useCustomForm from './../customHooks/useCustomForm';
import ErrorComponent from './../alerts/ErrorComponent'
import Link from 'next/link';

const initialValues = {
    nombreUsuario: "",
    apellido: "",
    email: "",
    password: "",
};

const FormSignup = (props) => {
    const [step, setStep] = useState(1);
    const [confirmar, setConfirmar] = useState({});
    const [errorConfirmar, setErrorConfirmar] = useState(false);

    /* const [paswword, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState(''); */

    const signup = ({ values }) => {
        props.signup({
            variables:
            {
                userName: values.nombreUsuario,
                email: values.email,
                password: values.password
            }
        })
    }

    const { values,
        errors,
        handleChange,
        handleSubmit
    } = useCustomForm({ initialValues, signup }
    );

    useEffect(() => {
        if (confirmar.password === confirmar.passwordConf) {
            setErrorConfirmar(false)
        } else {
            setErrorConfirmar(true)
        }

    }, [confirmar])

    const confirmarPassword = (event) => {
        setConfirmar({
            ...confirmar,
            [event.target.name]: event.target.value
        })

    }


    if (step === 1) {
        return (
            <Fragment>
                <div className={styles.form_signup__message}>
                    <h1 className="heading_secondary">Registro</h1>
                    <p className="paragraph">Ingresa tus datos para tener una mejor experiencia</p>
                    <p className="paragraph">Ya tienes cuenta <Link href="/login"><a>INGRESA !</a></Link> </p>
                </div>

                <form className={styles.form_signup} >
                    <div className={styles.form_signup__group}>
                        <input
                            className={styles.form_signup__input}
                            id="usuario"
                            type="text"
                            name="nombreUsuario"
                            placeholder="Nombre"
                            minLength="4"
                            required
                        />
                        <label htmlFor="usuario" className={styles.form_signup__label}>Apellido</label>
                    </div>
                    <div className={styles.form_signup__group}>
                        <input
                            className={styles.form_signup__input}
                            id="apellido"
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            minLength="4"
                            required
                        />
                        <label htmlFor="apellido" className={styles.form_signup__label}>Apellido</label>
                    </div>
                    <div className={styles.form_signup__group}>
                        <input 
                        className={styles.form_signup__input} 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="E-mail" 
                        required
                        />
                        <label htmlFor="email" className={styles.form_signup__label}>Email</label>
                    </div>
                    <div className={styles.form_signup__group}>
                        <input
                            className={styles.form_signup__input}
                            id="password" 
                            type="password"
                            name="password"
                            placeholder="contraseña"
                            onChange={confirmarPassword}
                            minLength="8"
                            required
                        />
                        <label htmlFor="password" className={styles.form_signup__label}>Contraseña</label>
                    </div>
                    <div className={styles.form_signup__group}>
                        <input
                            className={styles.form_signup__input}
                            id="passwordConf"
                            type="password"
                            name="passwordConf"
                            placeholder="confirmar contraseña"
                            onChange={confirmarPassword}
                            minLength="8"
                            required

                        />
                        <label htmlFor="passwordConf" className={styles.form_signup__label}>Confirmar contraseña</label>
                    </div>
                    {/* <div className={styles.line_break}></div> */}
                    <div className={`${styles.form_signup__group}`}>
                        {
                            /* errorConfirmar && (<div className={styles.error_mensaje}>no se puedo ingresar</div>) */
                        }
                        <input className={`${styles.btn} ${styles.btn__primary}`} type="submit" value="Registrarse" name="submit" />
                    </div>
                    <div className={`${styles.form_signup__group}`}>
                        <ErrorComponent show={errorConfirmar}>Las contraseñas no coinciden</ErrorComponent>
                    </div> 
                </form>
            </Fragment>
        )
    } else {
        return (
            <div>Segundo paso</div>
        )

    }

}

export default FormSignup;