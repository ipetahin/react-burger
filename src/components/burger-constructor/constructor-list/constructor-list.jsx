import styles from './constructor-list.module.css';
import ConstructorItem from '../constructor-item/constructor-item';
import { ingredientsPropType } from '../../../utils/prop-types';

const ConstructorList = ({ ingredients }) => {
  return (
    <section className='mb-10'>
      <ConstructorItem key={`${ingredients[0]._id}-1`} ingredient={ingredients[0]} type='top' extraClass={styles.fix_item} />
      <ul className={`${styles.list}`}>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[8]._id} ingredient={ingredients[8]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[5]._id} ingredient={ingredients[5]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[11]._id} ingredient={ingredients[11]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[10]._id} ingredient={ingredients[10]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[10]._id} ingredient={ingredients[10]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[9]._id} ingredient={ingredients[9]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[6]._id} ingredient={ingredients[6]} />
        </li>
      </ul>
      <ConstructorItem key={`${ingredients[0]._id}-2`} ingredient={ingredients[0]} type='bottom' extraClass={styles.fix_item} />
    </section>
  );
};

ConstructorList.propTypes = {
  ingredients: ingredientsPropType,
};

export default ConstructorList;
