import { useState } from 'react';

const useShowModal = (initialValue) => {
  const [isShowModal, setShowModal] = useState(initialValue);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return { isShowModal, openModal, closeModal };
};

export default useShowModal;
