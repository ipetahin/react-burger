import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import useShowModal from '../../../hooks/use-show-modal';
import { ingredientItemPropType } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { set } from '../../../services/slices/ingredient-details-slice';

const IngredientItem = ({ ingredient, counter = null }) => {
  const { isShowModal, openModal, closeModal } = useShowModal(false);

  const { name, image, price } = ingredient;

  const dispatch = useDispatch();

  const handleShowIngredientDetails = () => {
    dispatch(set(ingredient));
    openModal();
  };

  return (
    <>
      <li className={styles.ingredient} onClick={handleShowIngredientDetails}>
        {counter && <Counter count={counter} size='default' extraClass={styles.counter} />}
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
