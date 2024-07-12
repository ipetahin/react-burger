import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalPropType } from '../../utils/prop-types';
import styles from './modal.module.css';
import useShowModal from '../../hooks/use-show-modal';

const modalRoot = document.getElementById('modals');

const Modal = ({ children }) => {
  const { isLoading } = useSelector((store) => store.orderDetails);
  const { isShowModal, closeModal } = useShowModal(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEscCloseModal);

    return () => {
      document.removeEventListener('keydown', handleKeyEscCloseModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickCloseModal = () => {
    closeModal();
    navigate(-1, { replace: true });
  };

  const handleKeyEscCloseModal = (e) => {
    if (e.code === 'Escape') {
      closeModal();
      navigate(-1, { replace: true });
    }
  };

  return createPortal(
    isShowModal && (
      <>
        {isLoading ? (
          <>
            <ModalOverlay onClick={null} />
            <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
          </>
        ) : (
          <>
            <ModalOverlay onClick={handleClickCloseModal} />
            <div className={styles.modal}>
              <span className={styles.close} onClick={handleClickCloseModal}>
                <CloseIcon type='primary' />
              </span>
              {children}
            </div>
          </>
        )}
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  ...modalPropType,
};

export default Modal;
