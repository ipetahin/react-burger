import { useEffect, useMemo } from 'react';
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

  const fl_bun = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
  };

  const testIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  };

  useEffect(() => {
    dispatch(add(fl_bun));
    dispatch(add(testIngredient));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitOrder = () => {
    if (bun && ingredients.length) {
      dispatch(request());

      fetchApi('orders', { ingredients: [bun._id, testIngredient._id, bun._id] })
        .then((data) => dispatch(success(data)))
        .then(() => openModal())
        .catch(() => dispatch(failure()));
    }
  };

  return (
    <article className={`pt-25 pb-10 pl-4`}>
      <ConstructorList bun={bun} ingredients={ingredients} />
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
