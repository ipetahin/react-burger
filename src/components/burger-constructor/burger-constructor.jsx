import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ConstructorList from './constructor-list/constructor-list';
import { sendOrder } from '../../services/slices/order-details-slice';
import { addIngredient } from '../../services/slices/burger-сonstructor-slice';

const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const { isLoading } = useSelector((store) => store.burgerIngredients);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [bun, ingredients]);

  const handleSubmitOrder = () => {
    if (!user) {
      return navigate('/login', { state: { from: location } });
    }

    if (bun && ingredients.length) {
      const preparedData = { ingredients: [bun._id, ...ingredients.map((ingredient) => ingredient._id), bun._id] };
      dispatch(sendOrder(preparedData));
      navigate('/', { state: { backgroundLocation: location } });
    }
  };

  const handleIngredientDrop = (item) => {
    dispatch(addIngredient(item.ingredient));
  };

  return (
    !isLoading && (
      <article className={`pt-25 pb-10 pl-4`}>
        <ConstructorList bun={bun} ingredients={ingredients} onDropHandler={handleIngredientDrop} />
        <div className={styles.order}>
          <span className={`${styles.total} text text_type_digits-medium`}>
            {totalPrice}
            <CurrencyIcon type='primary' />
          </span>
          <Button htmlType='button' type='primary' size='large' onClick={handleSubmitOrder}>
            Оформить заказ
          </Button>
        </div>
      </article>
    )
  );
};

export default BurgerConstructor;
