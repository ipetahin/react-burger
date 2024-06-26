import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorList from './constructor-list/constructor-list';
import useShowModal from '../../hooks/use-show-modal';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = () => {
  const { isShowModal, openModal, closeModal } = useShowModal(false);
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [bun, ingredients]);

  return (
    <article className={`pt-25 pb-10 pl-4`}>
      <ConstructorList />
      <div className={styles.order}>
        <span className={`${styles.total} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type='primary' />
        </span>
        <Button htmlType='button' type='primary' size='large' onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isShowModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </article>
  );
};

export default BurgerConstructor;
