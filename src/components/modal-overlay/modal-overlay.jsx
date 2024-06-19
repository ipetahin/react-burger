import styles from './modal-overlay.module.css';
import { modalOverlayPropType } from '../../utils/prop-types';

const ModalOverlay = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  ...modalOverlayPropType,
};

export default ModalOverlay;
