import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { request, success, failure } from '../../services/slices/burger-ingredients-slice';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import IngredientGroup from './ingredient-group/ingredient-group';
import fetchApi from '../../utils/fetch-api';

const BurgerIngredients = () => {
  const { isLoading, isError, data } = useSelector((state) => state.burgerIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(request());

    fetchApi('ingredients')
      .then((res) => dispatch(success(res.data)))
      .catch(() => dispatch(failure()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* TODO: spinner */}
      {isLoading && <>Идет загрузка ингредиентов...</>}
      {/* TODO: show error */}
      {isError && <>Ошибка при загрузке ингредиентов</>}
      {data && (
        <article className={`pt-10 pb-10`}>
          <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
          <div className={`${styles.tabs} mb-10`}>
            <Tab key='bunTab' active>
              Булки
            </Tab>
            <Tab key='sauceTab'>Соусы</Tab>
            <Tab key='mainTab'>Начинки</Tab>
          </div>
          <div className={`${styles.groups}`}>
            <IngredientGroup key='bunGroup' ingredients={data} name='Булки' type='bun' />
            <IngredientGroup key='sauceGroup' ingredients={data} name='Соусы' type='sauce' />
            <IngredientGroup key='mainGroup' ingredients={data} name='Начинки' type='main' />
          </div>
        </article>
      )}
    </>
  );
};

export default BurgerIngredients;
