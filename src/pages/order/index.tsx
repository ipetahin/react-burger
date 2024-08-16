import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';

import styles from './order.module.css';
import OrderInfo from '../../components/order-info/order-info';

export default function OrderPage() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <OrderInfo />
    </main>
  );
}
