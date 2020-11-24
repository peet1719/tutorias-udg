import React, { useState, useEffect } from 'react';
import styles from './../../assets/styles/main.module.scss';
import useCustomForm from './../customHooks/useCustomForm';
import ErrorComponent from './../alerts/ErrorComponent';
import Link from 'next/link';
import { useReadReactiveVar } from './../customHooks/useReadReactiveVar';
import { errorsVar } from './../../cache';

const initialValues = {
    nombreUsuario: "",
    password: ""
};

const FormLogin = (props) => {
    const [error, setError] = useState(errorsVar())
    /* const error = useReadReactiveVar('error'); */
    /* const error = errorsVar(); */

    useEffect(() => {
        setError(errorsVar())
    })

    const login = ({ values }) => {
        props.login({
            variables:
            {
                userName: values.nombreUsuario,
                password: values.password
            }
        })
    }


    const { values,
        errors,
        handleChange,
        handleSubmit
    } = useCustomForm({ initialValues, onSubmit: login }
    );



    return (
        <div className={styles.container__login}>
            {/* <div className="home">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <form >
                            <input type="text" v-model="email" id="login" className="fadeIn second" name="NombreUsuario" placeholder="login" />
                            <input type="Password" v-model="password" id="password" className="fadeIn third" name="Password" placeholder="password" />
                            <input type="submit" value="Ingresar" name="submit" />
                        </form>
                    </div>
                </div>
            </div> */}
            <div className={styles.login}>
                <form className={styles.form_login} onSubmit={handleSubmit}>
                    <div className={styles.form_login__group}>
                        <ErrorComponent>{error}</ErrorComponent>
                    </div>
                    <div className={styles.form_login__group}>
                        <input
                            className={styles.form_login__input}
                            id="usuario"
                            type="email"
                            name="nombreUsuario"
                            placeholder="E-mail"
                            required
                            onChange={handleChange}
                            value={values.nombreUsario}
                            onFocus={() => { errorsVar('') }}
                        />
                        <label htmlFor="usuario" className={styles.form_login__label}>E-mail</label>
                    </div>
                    <div className={styles.form_login__group}>
                        <input
                            className={styles.form_login__input}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Constraseña"
                            required
                            onChange={handleChange}
                            value={values.password}
                            onFocus={() => { errorsVar('') }}
                        />
                        <label htmlFor="password" className={styles.form_login__label}>Contraseña</label>
                        <Link href="account/reset_password" passHref={true} ><a className={styles.forgot_password}> ¿Olvidaste tu constraseña?</a></Link>
                    </div>
                    <div className={styles.form_login__group}>
                        <input className={`${styles.btn} ${styles.btn__primary}`} type="submit" value="ingresar" name="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormLogin;