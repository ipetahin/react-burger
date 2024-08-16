import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import OrderList from '../../components/order-list';
import Stats from '../../components/stats';
import styles from './feed.module.css';
import { getIngredients } from '../../services/slices/burger-ingredients-slice';

export default function FeedPage() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`${styles.main} pr-5 pl-5`}>
      <h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
      <div className={`${styles.container} mt-5`}>
        <OrderList isShowStatus={false} />
        <Stats />
      </div>
    </main>
  );
}
