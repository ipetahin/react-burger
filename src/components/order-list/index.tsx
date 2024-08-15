import styles from './order-list.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Store } from '../../types';
import { ordersResponse } from '../../types/orders';
import { GridLoader } from 'react-spinners';

const OrderList = () => {
  const { isLoading, isError, data } = useSelector((store: Store) => store.burgerIngredients);

  return (
    <ul className={styles.list}>
      <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data &&  ordersResponse.orders.map((order) => {
        const ingredients = order.ingredients.map((ingredientId) => data?.find((ingredient) => ingredient._id === ingredientId));
        return (
          <li className={styles.card}>
            <div className={styles.id}>
              <span className='text text_type_digits-default'>{`#0${order.number}`}</span>
              <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
            </div>
            <div className='info'>
              <span className='text text_type_main-medium'>Death Star Starship Main бургер</span>
              <span id='status'></span>
            </div>
            <div className={styles.components}>
              <ul className={styles.ingredients}>
                {ingredients.map((ingredient, i) => {
                  return i < 6 ? (
                    <li className={styles.ingredient} style={{ transform: `translate(${-16 * i}px`, zIndex: `${6 - i}` }}>
                      <img src={ingredient?.image_mobile} alt={ingredient?.name} className={styles.preview} />
                    </li>
                  ) : null;
                })}
              </ul>
              <div className={styles.price}>
                <span className='text text_type_digits-default'>{ingredients.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0)}</span>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default OrderList;
