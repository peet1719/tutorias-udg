import React, {useState, useEffect} from 'react';
import styles from './../../assets/styles/components/modals.module.scss';
import button from './../../assets/styles/components/buttons.module.scss';
import Modal from 'react-modal';
import {showModalVar} from './../../cache';


Modal.setAppElement('#__next');

const customStyles = {
    overlay: {
        paddingTop: "2rem",
        backgroundColor: 'transparent',
    },
    content: {
        display: "contents",
        backgroundColor: 'transparent',
        overflow: 'hidden'

    }
}

const MensajeRegistro = (props) => {
    const [modal, setModal] = useState(false)

    showModalVar(false)
    useEffect(() => {
        setModal(props.show)
        console.log(modal)
    },[])


    return (
        <Modal isOpen={modal} style={customStyles} onRequestClose={() => setModal(false)}>
            <div className={styles.registro__wrapper}>
                <div className={styles.registro__container}>
                    <h1 className={styles.registro__header}>Registro exitoso</h1>

                    <p className={styles.registro__mensaje}>Se han enviado instrucciones a tu correo, confirma tu email para empezar a usar tutoUDG</p>
                    <input onClick={() => setModal(false)} className={`${button.btn} ${button.btn__white} margin_t_mall`} type="submit" value="Aceptar" name="submit" />
                </div>
            </div>
        </Modal>
    )
}

export default MensajeRegistro;