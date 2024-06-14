import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

const IngredientItem = ({ name, image, price, counter = null }) => {
  return (
    <li className={styles.ingredient}>
      {counter && <Counter count={counter} size='default' extraClass={styles.counter} />}
      <img src={image} alt={name} className='ml-4 mr-4' />
      <span className={`${styles.price} text text_type_digits-default`}>
        {price}
        <CurrencyIcon type='primary' />
      </span>
      <span>{name}</span>
    </li>
  );
};

export default IngredientItem;
