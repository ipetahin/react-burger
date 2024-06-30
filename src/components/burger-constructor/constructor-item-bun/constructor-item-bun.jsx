import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { constructorItemBunPropType } from '../../../utils/prop-types';
import styles from './constructor-item-bun.module.css';

const ConstructorItemBun = ({ ingredient, position, extraClass = '' }) => {
  return (
    <div className={`${styles.item} ${extraClass}`}>
      <ConstructorElement
        text={`${ingredient.name}${position === 'top' ? ' (верх)' : ' (низ)'}`}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        type={position}
        isLocked={true}
        extraClass={styles.element}
      />
    </div>
  );
};

ConstructorItemBun.propTypes = {
  ...constructorItemBunPropType,
};

export default ConstructorItemBun;
