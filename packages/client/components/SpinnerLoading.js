import React from 'react';
import styles from './../assets/styles/components/spinnerLoading.module.scss';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const customStyles = {
  overlay:{
    backgroundColor: 'transparent'
  },
  content : {
    backgroundColor: 'transparent',
    border: 'none',
    top                   : '0%',
    left                  : '0%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%', 
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'

  }
}

const SpinnerLoading = (props) => {
    return(
        <Modal isOpen={props.isOpen} style={customStyles}>
            <div className={styles.wrapper}>
                <div className={styles.loading_spinner}></div>
            </div>
        </Modal>
    )
}

export default SpinnerLoading;