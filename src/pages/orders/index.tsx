import { useEffect } from 'react';

import OrderList from '../../components/order-list';
import styles from './orders.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { connect, disconnect } from '../../services/slices/websocket-slice';
import { GridLoader } from 'react-spinners';
import { WebsocketStatus } from '../../types/websocket';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((store) => store.webSocket);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) dispatch(connect(`orders?token=${accessToken.substring(7)}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      <GridLoader color='#fff' loading={status !== WebsocketStatus.ONLINE} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }}/>
      {status === WebsocketStatus.ONLINE && orders.length > 0 && <OrderList isShowStatus={true} linkEndpoint='/profile/orders' isOrdersReverse={true} />}
    </div>
  );
}
