import { createPortal } from 'react-dom';

import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modals');

const Modal = ({ type, closeModal, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEscCloseModal);

    return () => {
      document.removeEventListener('keydown', handleKeyEscCloseModal);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickCloseModal = () => {
    closeModal();
  };

  const handleKeyEscCloseModal = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const modalView = (
    <div className={`${styles.modal} ${type === 'ingredient' && styles.modal_ingredient}`}>
      {type === 'ingredient' && <h2 className={`${styles.header} text text_type_main-large`}>Детали ингредиента</h2>}
      <span className={styles.close} onClick={handleClickCloseModal}>
        <CloseIcon />
      </span>
      {children}
    </div>
  );

  return createPortal(
    <>
      <ModalOverlay onClick={handleClickCloseModal} />
      {modalView}
    </>,
    modalRoot
  );
};

export default Modal;
