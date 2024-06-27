import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';
import { constructorItemPropType } from '../../../utils/prop-types';

const ConstructorItem = ({ ingredient, position, extraClass = '' }) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      {ingredient.type !== 'bun' && <DragIcon type='primary' />}
      <ConstructorElement
        text={`${ingredient.name}${position === 'top' ? ' (верх)' : position === 'bottom' ? ' (низ)' : ''}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={position}
        isLocked={ingredient.type === 'bun'}
        extraClass={styles.element}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  ...constructorItemPropType,
};

export default ConstructorItem;
