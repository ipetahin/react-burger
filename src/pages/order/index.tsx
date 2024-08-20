import { useEffect } from 'react';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import styles from './order.module.css';
import OrderInfo from '../../components/order-info';
import { useDispatch } from '../../services/hooks';

export default function OrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <OrderInfo />
    </main>
  );
}
