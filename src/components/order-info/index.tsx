import { useParams } from 'react-router-dom';

import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { GridLoader } from 'react-spinners';
import { Ingredient, Ingredients } from '../../types';
import { Statuses } from '../order-list';
import { useSelector } from '../../services/hooks';

interface IngredientInfo extends Ingredient {
  amount: number;
}

export const getIngredientsInfo = (ingredientsId: Array<string>, data: Ingredients | null) => {
  const uniqueIngredients = [...new Set(ingredientsId)];

  return uniqueIngredients.map(
    (ingredientId) => ({ ...data?.find((ingredient) => ingredient._id === ingredientId), amount: ingredientsId.filter((id) => id === ingredientId).length } as IngredientInfo)
  );
};

const OrderInfo = () => {
  const { number } = useParams();
  const { isLoading, isError, data } = useSelector((store) => store.burgerIngredients);
  const { orders } = useSelector((store) => store.webSocket);

  const order = orders.filter((order) => order.number.toString() === number)[0];

  const ingredientsInfo = getIngredientsInfo(order.ingredients, data);

  return (
    <div className={styles.order}>
      <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data && (
        <>
          <h2 className={'text text_type_digits-default'}>{`#0${order.number}`}</h2>
          <span className='text text_type_main-medium mt-10'>{order.name}</span>
          <span className={`${styles.status} text text_type_main-default mt-3 ${order.status === 'done' ? styles.done : ''}`}>{Statuses[order.status]}</span>
          <span className='text text_type_main-medium mt-15'>Состав:</span>
          <ul className={`${styles.ingredients} mt-6`}>
            {ingredientsInfo.map((ingredient) => (
              <li className={styles.ingredient}>
                <div className={styles['preview-container']}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.preview} />
                </div>
                <span>{ingredient.name}</span>
                <div className={`${styles.price} ${styles.amount}`}>
                  <span className='text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</span>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
            ))}
          </ul>
          <div className={`${styles.total} mt-10`}>
            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
            <div className={styles.price}>
              <span className='text text_type_digits-default'>{ingredientsInfo.reduce((acc, ingredient) => (acc += ingredient.price * ingredient.amount), 0)}</span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderInfo;
