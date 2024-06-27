import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import useShowModal from '../../../hooks/use-show-modal';
import { ingredientItemPropType } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { set } from '../../../services/slices/ingredient-details-slice';
import { useDrag } from 'react-dnd';
import { useState } from 'react';

const IngredientItem = ({ ingredient }) => {
  const [counter, setCounter] = useState(null);

  const { isShowModal, openModal, closeModal } = useShowModal(false);

  const { name, image, price } = ingredient;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: (monitor) => {
      const droppedItem = monitor.getItem();
      if (monitor.didDrop() && droppedItem.ingredient._id === ingredient._id) {
        droppedItem.ingredient.type === 'bun' ? setCounter(2) : setCounter(counter + 1);
      }
    },
  });

  const dispatch = useDispatch();

  const handleShowIngredientDetails = () => {
    dispatch(set(ingredient));
    openModal();
  };

  return (
    <>
      <li className={styles.ingredient} onClick={handleShowIngredientDetails} ref={dragRef}>
        {counter && <Counter count={counter} size='default' />}
        <img src={image} alt={name} className='ml-4 mr-4' />
        <span className={`${styles.price} text text_type_digits-default`}>
          {price}
          <CurrencyIcon type='primary' />
        </span>
        <span>{name}</span>
      </li>
      {isShowModal && (
        <Modal text='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

IngredientItem.propTypes = {
  ...ingredientItemPropType,
};

export default IngredientItem;
