import { useState, useEffect } from 'react';
import styles from './../../assets/styles/components/alerts.module.scss'
import WarningIcon from './../../assets/icons/warning.svg';
import { CSSTransition } from 'react-transition-group';
import { errorsVar } from './../../cache';

const ErrorComponent = (props) => {
    return (
        <CSSTransition
            in={!!errorsVar()}
            timeout={500}
            unmountOnExit
            classNames={{
                enter: styles["errorEnter"],
                enterActive: styles["errorEnterActive"],
                exit: styles["errorExit"],
                exitActive: styles["errorExitActive"]
            }}
        >
            <div className={styles.error_container}>
                <p className={styles.error_message}>
                    <span className={styles.error_svg}><WarningIcon className={styles.svg}></WarningIcon></span> {props.children}
                </p>
            </div>
        </CSSTransition>

    )


}

export default ErrorComponent;