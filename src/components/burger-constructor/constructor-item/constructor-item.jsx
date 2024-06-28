import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';
import { constructorItemPropType } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../../services/slices/burger-сonstructor-slice';

const ConstructorItem = ({ ingredient, position, extraClass = '' }) => {
  const dispatch = useDispatch();

  const handleDeleteIngredient = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <div className={`${styles.item} ${extraClass}`}>
      {ingredient.type !== 'bun' && <DragIcon type='primary' />}
      <ConstructorElement
        text={`${ingredient.name}${position ? (position === 'top' ? ' (верх)' : ' (низ)') : ''}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={position}
        isLocked={ingredient.type === 'bun'}
        extraClass={styles.element}
        handleClose={() => handleDeleteIngredient(ingredient)}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  ...constructorItemPropType,
};

export default ConstructorItem;
