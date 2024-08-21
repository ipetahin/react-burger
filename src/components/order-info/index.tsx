import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { GridLoader } from 'react-spinners';
import { Ingredient, Ingredients } from '../../types';
import { Statuses } from '../../types/common';
import { useDispatch, useSelector } from '../../services/hooks';
import { clearOrder, getOrder, updateOrder } from '../../services/slices/order-details-slice';

interface IngredientInfo extends Ingredient {
  amount: number;
}

export const getIngredientsInfo = (ingredientsId: Array<string>, data: Ingredients | null) => {
  const uniqueIngredients = [...new Set(ingredientsId)];

  return uniqueIngredients.map(
    (ingredientId) => ({ ...data?.find((ingredient) => ingredient._id === ingredientId), amount: ingredientsId.filter((id) => id === ingredientId).length } as IngredientInfo)
  );
};

const OrderInfo = () => {
  const { number } = useParams();
  const { isLoading: ingredientsLoading, data } = useSelector((store) => store.burgerIngredients);
  const { isLoading: orderLoading, isError, data: order } = useSelector((store) => store.orderDetails);
  const { orders } = useSelector((store) => store.webSocket);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      dispatch(getOrder(number!));
    }
    return () => {
      dispatch(clearOrder());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const foundedOrder = orders.find((order) => order.number.toString() === number);
    if (!order) {
      if (foundedOrder) {
        dispatch(updateOrder(foundedOrder));
      }
    } else {
      if (foundedOrder && foundedOrder.status !== order.status) {
        dispatch(updateOrder(foundedOrder))
      }
    }
  }, [dispatch, number, order, orders]);

  return (
    <div className={styles.order}>
      <GridLoader
        color='#fff'
        loading={ingredientsLoading || orderLoading}
        cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }}
      />
      {isError && <h2>Ошибка при загрузке заказа</h2>}
      {!location.state && !orderLoading && !isError && !order && <h2>{`Заказ #0${number} не найден`}</h2>}
      {order && (
        <>
          <h2 className={'text text_type_digits-default'}>{`#0${number}`}</h2>
          <span className='text text_type_main-medium mt-10'>Black Hole Singularity острый бургер</span>
          <span className={`${styles.status} text text_type_main-default mt-3 ${order.status === 'done' ? styles.done : ''}`}>{Statuses[order.status]}</span>
          <span className='text text_type_main-medium mt-15'>Состав:</span>
          <ul className={`${styles.ingredients} mt-6`}>
            {order.ingredients &&
              getIngredientsInfo(order.ingredients, data).map((ingredient) => (
                <li key={ingredient._id} className={styles.ingredient}>
                  <div className={styles['preview-container']}>
                    <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.preview} />
                  </div>
                  <span>{ingredient.name}</span>
                  <div className={`${styles.price} ${styles.amount}`}>
                    <span className='text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</span>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              ))}
          </ul>
          <div className={`${styles.total} mt-10`}>
            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
            <div className={styles.price}>
              <span className='text text_type_digits-default'>
                {order.ingredients && getIngredientsInfo(order.ingredients, data).reduce((acc, ingredient) => (acc += ingredient.price * ingredient.amount), 0)}
              </span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderInfo;
