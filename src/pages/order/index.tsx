import styles from './order.module.css';
import OrderInfo from '../../components/order-info';

export default function OrderPage() {
  return (
    <main className={styles.main}>
      <OrderInfo />
    </main>
  );
}
