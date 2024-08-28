import { PropsWithChildren, ReactPortal, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GridLoader } from 'react-spinners';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import useShowModal from '../../hooks/use-show-modal';
import { useSelector } from '../../services/hooks';

const modalRoot = document.getElementById('modals') as HTMLElement;

interface ModalProps {
  onClose?: () => void;
}

const Modal = ({ children, onClose }: PropsWithChildren<ModalProps>): ReactPortal => {
  const { isLoading } = useSelector((store) => store.orderDetails);
  const { isShowModal, closeModal } = useShowModal(true);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEscCloseModal);

    return () => {
      document.removeEventListener('keydown', handleKeyEscCloseModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    closeModal();
    if (onClose) onClose();
  };

  const handleKeyEscCloseModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      handleCloseModal();
    }
  };

  return createPortal(
    isShowModal && (
      <>
        {isLoading ? (
          <>
            <ModalOverlay />
            <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
          </>
        ) : (
          <>
            <ModalOverlay onClick={handleCloseModal} />
            <div className={styles.modal} data-testid='modal'>
              <span className={styles.close} onClick={handleCloseModal}>
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

export default Modal;
