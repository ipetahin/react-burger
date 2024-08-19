import { useEffect } from 'react';

import OrderList from '../../components/order-list';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import styles from './orders.module.css';
import { useDispatch } from '../../services/hooks';

export default function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className={styles.orders}>
      <OrderList isShowStatus={true} endpoint='/profile/orders' />
    </div>
  );
}
