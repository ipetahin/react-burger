import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorList from './constructor-list/constructor-list';
import useShowModal from '../../hooks/use-show-modal';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import fetchApi from '../../utils/fetch-api';
import { request, success, failure } from '../../services/slices/order-details-slice';
import { add } from '../../services/slices/burger-сonstructor-slice';

const BurgerConstructor = () => {
  const { isShowModal, openModal, closeModal } = useShowModal(false);
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [bun, ingredients]);

  const handleSubmitOrder = () => {
    if (bun && ingredients.length) {
      dispatch(request());
      const orderIngredientIds = [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id];
      fetchApi('orders', { ingredients: orderIngredientIds })
        .then((data) => dispatch(success(data)))
        .then(() => openModal())
        .catch(() => dispatch(failure()));
    }
  };

  const handleIngredientDrop = (item) => {
    dispatch(add(item.ingredient));
  };

  return (
    <article className={`pt-25 pb-10 pl-4`}>
      <ConstructorList bun={bun} ingredients={ingredients} onDropHandler={handleIngredientDrop} />
      <div className={styles.order}>
        <span className={`${styles.total} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type='primary' />
        </span>
        <Button htmlType='button' type='primary' size='large' onClick={handleSubmitOrder}>
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
