import React, { useState, useEffect } from 'react';
import styles from './../../assets/styles/components/modals.module.scss';
import button from './../../assets/styles/components/buttons.module.scss';
import Modal from 'react-modal';
import { showModalVar } from './../../cache';
import { useRouter } from 'next/router';

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

const MensajeDefault = (props) => {
    const [modal, setModal] = useState(false)
    showModalVar(false)

    const router = useRouter();

    useEffect(() => {
        setModal(props.show)
        console.log(props.show)
    }, [props.show])



    return (
        <Modal isOpen={modal} style={customStyles} /* onRequestClose={() => setModal(false)}*/ >
            <div className={styles.registro__wrapper}>
                <div className={styles.registro__container}>
                    <h1 className={styles.registro__header}>{props.title} </h1>
                    <p className={styles.registro__mensaje}>{props.text}</p>
                    <input onClick={() => {
                        setModal(false)
                        props.redirect ? router.push(props.redirect) : false
                    }} className={`${button.btn} ${button.btn__white} margin_t_mall`} type="submit" value="Aceptar" name="submit" />
                </div>
            </div>
        </Modal>
    )
}

export default MensajeDefault;