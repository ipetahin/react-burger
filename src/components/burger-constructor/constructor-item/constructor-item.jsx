import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item.module.css';
import { constructorItemPropType } from '../../../utils/prop-types';

const ConstructorItem = ({ ingredient, type = undefined, extraClass }) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      {ingredient.type !== 'bun' && <DragIcon type='primary' />}
      <ConstructorElement
        text={`${ingredient.name}${type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : ''}`} // TODO: refactor somehow text type
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={type}
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
