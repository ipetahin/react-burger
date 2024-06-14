import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorList from './constructor-list/constructor-list';

const BurgerConstructor = ({ ingredients }) => {
  return (
    <div className={`${styles.container} pt-25 mb-10 pl-4`}>
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
    </div>
  );
};

export default BurgerConstructor;
