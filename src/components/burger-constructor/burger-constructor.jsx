import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorList from './constructor-list/constructor-list';
import { ingredientsPropType } from '../../utils/prop-types';

const BurgerConstructor = ({ ingredients }) => {
  return (
    <article className={`pt-25 pb-10 pl-4`}>
      <ConstructorList ingredients={ingredients} />
      <div className={styles.order}>
        <span className={`${styles.total} text text_type_digits-medium`}>
          {610}
          <CurrencyIcon type='primary' />
        </span>
        <Button htmlType='button' type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </article>
  );
};

BurgerConstructor.propTypes = {
  ingredients: ingredientsPropType,
};

export default BurgerConstructor;
