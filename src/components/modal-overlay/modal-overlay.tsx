import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClick?: () => void;
}

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
