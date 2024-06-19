import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

import Modal from '../../modal/modal';
import { useState } from 'react';
import IngredientDetails from '../../ingredient-details/ingredient-details';

const IngredientItem = ({ ingredient, counter = null }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { name, image, price } = ingredient;

  return (
    <>
      <li className={styles.ingredient} onClick={openModal}>
        {counter && <Counter count={counter} size='default' extraClass={styles.counter} />}
        <img src={image} alt={name} className='ml-4 mr-4' />
        <span className={`${styles.price} text text_type_digits-default`}>
          {price}
          <CurrencyIcon type='primary' />
        </span>
        <span>{name}</span>
      </li>
      {showModal && (
        <Modal type='ingredient' closeModal={closeModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

export default IngredientItem;
