import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { clearOrder } from '../../services/slices/order-details-slice';
import done from '../../images/done.gif';
import styles from './order-details.module.css';
import { Store } from '../../types';

const OrderDetails = () => {
  const { isError, data } = useSelector((store: Store) => store.orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearOrder());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.order}>
      {isError && <>Ошибка при отпраке заказа</>}
      {data ? (
        <>
          <span className={`${styles.order_number} text text_type_digits-large`}>{data.order.number}</span>
          <span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
          <img src={done} alt='done' className='mt-15' />
          <span className='text text_type_main-default mt-15'>Ваш заказ начали готовить</span>
          <span className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
        </>
      ) : (
        <Navigate to='/' replace={true} />
      )}
    </div>
  );
};

export default OrderDetails;
