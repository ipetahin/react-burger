import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { GridLoader } from 'react-spinners';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalPropType } from '../../utils/prop-types';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modals');

const Modal = ({ text, closeModal, children }) => {
  const { isLoading } = useSelector((store) => store.orderDetails);

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

  return createPortal(
    <>
      <ModalOverlay onClick={isLoading ? null : handleClickCloseModal} />
      {isLoading ? (
        <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
      ) : (
        <div className={styles.modal}>
          {text && <h2 className={`${styles.header} mt-10 ml-10 mr-10 text text_type_main-large`}>{text}</h2>}
          <span className={styles.close} onClick={handleClickCloseModal}>
            <CloseIcon type='primary' />
          </span>
          {children}
        </div>
      )}
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  ...modalPropType,
};

export default Modal;
