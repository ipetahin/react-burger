import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './constructor-item-skeleton.module.css';
import { constructorItemSkeletonPropType } from '../../../utils/prop-types';

const ConstructorItemSkeleton = ({ text, position, extraClass }) => {
  return (
    <div className={`${styles.item} ${extraClass} ml-8`}>
      <ConstructorElement text={text} type={position} extraClass={styles.element} />
    </div>
  );
};

ConstructorItemSkeleton.propTypes = {
  ...constructorItemSkeletonPropType,
};

export default ConstructorItemSkeleton;
