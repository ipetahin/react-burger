import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OrderList from '../../components/order-list';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import styles from './orders.module.css';

export default function OrdersPage() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className={styles.orders}>
      <OrderList isShowStatus={true} />
    </div>
  );
}
