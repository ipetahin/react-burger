import { useEffect } from 'react';

import OrderList from '../../components/order-list';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import styles from './orders.module.css';
import { useDispatch } from '../../services/hooks';
import { connect, disconnect } from '../../services/slices/websocket-slice';

export default function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${accessToken.substring(7)}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      <OrderList isShowStatus={true} linkEndpoint='/profile/orders' isOrdersReverse={true} />
    </div>
  );
}
