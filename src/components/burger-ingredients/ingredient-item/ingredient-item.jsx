import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import { set } from '../../../services/slices/ingredient-details-slice';
import useShowModal from '../../../hooks/use-show-modal';
import { ingredientItemPropType } from '../../../utils/prop-types';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ ingredient }) => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const counter = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : null;
    } else {
      return ingredients.filter((item) => item._id === ingredient._id).length || null;
    }
  }, [bun, ingredients, ingredient.type, ingredient._id]);

  const { isShowModal, openModal, closeModal } = useShowModal(false);

  const { name, image, price } = ingredient;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
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
