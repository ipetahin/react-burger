import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-list.module.css';
import { Store } from '../../types';
import { ordersResponse } from '../../types/orders';

export enum Statuses {
  done = 'Выполнен',
  created = 'Создан',
  pending = 'Готовится',
}

interface OrderListProps {
  isShowStatus: boolean;
  endpoint: string;
}

const OrderList: FC<OrderListProps> = ({ isShowStatus, endpoint }) => {
  const { isLoading, isError, data } = useSelector((store: Store) => store.burgerIngredients);
  const location = useLocation();

  return (
    <ul className={styles.list}>
      <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data &&
        ordersResponse.orders.map((order) => {
          const ingredients = order.ingredients.map((ingredientId) => data?.find((ingredient) => ingredient._id === ingredientId));
          return (
            <Link className={styles.link} key={order._id} to={`${endpoint}/${order._id}`} state={{ backgroundLocation: location }}>
              <li className={styles.card}>
                <div className={styles.id}>
                  <span className='text text_type_digits-default'>{`#0${order.number}`}</span>
                  <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
                </div>
                <div className={styles.info}>
                  <span className='text text_type_main-medium'>Death Star Starship Main бургер</span>
                  {isShowStatus && (order.status === 'done' ? <span className={styles.done}>{Statuses['done']}</span> : <span>{Statuses[order.status]}</span>)}
                </div>
                <div className={styles.components}>
                  <ul className={styles.ingredients}>
                    {ingredients.map((ingredient, i) => {
                      return i < 5 ? (
                        <li className={styles.ingredient} style={{ transform: `translate(${-16 * i}px`, zIndex: `${6 - i}` }}>
                          <img src={ingredient?.image_mobile} alt={ingredient?.name} className={styles.preview} />
                        </li>
                      ) : i === 5 ? (
                        <li className={styles.ingredient} style={{ transform: `translate(${-16 * i}px`, zIndex: 1 }}>
                          <img src={ingredient?.image_mobile} alt={ingredient?.name} className={`${styles.preview} ${styles['preview-overlay']}`} />
                          <span className={`${styles['preview-amount']} text`}>{`+${ingredients.length - 5}`}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                  <div className={styles.price}>
                    <span className='text text_type_digits-default'>{ingredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0)}</span>
                    <CurrencyIcon type='primary' />
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
    </ul>
  );
};

export default OrderList;