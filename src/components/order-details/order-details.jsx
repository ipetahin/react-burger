import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';

import done from '../../images/done.gif';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const { isLoading, isError, data } = useSelector((store) => store.orderDetails);

  return (
    <div className={styles.order}>
      <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '47%', transform: "translate('-50%', '-47%')" }} />
      {isError && <>Ошибка при отпраке заказа</>}
      {data && (
        <>
          <span className={`${styles.order_number} text text_type_digits-large`}>{data.order.number}</span>
          <span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
          <img src={done} alt='done' className='mt-15' />
          <span className='text text_type_main-default mt-15'>Ваш заказ начали готовить</span>
          <span className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
