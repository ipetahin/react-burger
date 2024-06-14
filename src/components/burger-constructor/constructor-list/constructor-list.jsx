import styles from './constructor-list.module.css';
import ConstructorItem from '../constructor-item/constructor-item';

const ConstructorList = ({ ingredients }) => {
  return (
    <section>
      <ConstructorItem key={`${ingredients[0]._id}-1`} ingredient={ingredients[0]} type='top' extraClass={styles.fix_item} />
      <ul className={`${styles.list}`}>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[5]._id} ingredient={ingredients[5]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[4]._id} ingredient={ingredients[4]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={ingredients[7]._id} ingredient={ingredients[7]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={`${ingredients[8]._id}-1`} ingredient={ingredients[8]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={`${ingredients[8]._id}-2`} ingredient={ingredients[8]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={`${ingredients[8]._id}-3`} ingredient={ingredients[8]} />
        </li>
        <li className={styles.item}>
          <ConstructorItem key={`${ingredients[8]._id}-4`} ingredient={ingredients[8]} />
        </li>
      </ul>
      <ConstructorItem key={`${ingredients[0]._id}-2`} ingredient={ingredients[0]} type='bottom' extraClass={styles.fix_item} />
    </section>
  );
};

export default ConstructorList;
