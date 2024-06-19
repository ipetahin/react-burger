import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

import Modal from '../../modal/modal';
import IngredientDetails from '../../ingredient-details/ingredient-details';
import useShowModal from '../../../hooks/use-show-modal';
import { ingredientItemPropType } from '../../../utils/prop-types';

const IngredientItem = ({ ingredient, counter = null }) => {
  const { isShowModal, openModal, closeModal } = useShowModal(false);

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
      {isShowModal && (
        <Modal text='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
};

IngredientItem.propTypes = {
  ...ingredientItemPropType,
};

export default IngredientItem;
