import { useEffect } from 'react';

import OrderList from '../../components/order-list';
import OrderCounter from '../../components/order-counter';
import styles from './feed.module.css';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import { useDispatch } from '../../services/hooks';
import { connect, disconnect } from '../../services/slices/websocket-slice';

export default function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main} pr-5 pl-5`}>
      <h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
      <div className={`${styles.container} mt-5`}>
        <OrderList isShowStatus={false} linkEndpoint='/feed' />
        <OrderCounter />
      </div>
    </main>
  );
}
