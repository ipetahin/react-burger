import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { request, success, failure } from '../../services/slices/ingredients-slice';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import fetchApi from '../../utils/fetch-api';

function App() {
  const { isLoading, isError, data } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(request());

    fetchApi('ingredients')
      .then((data) => dispatch(success(data)))
      .catch(() => dispatch(failure()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <>
        <AppHeader />
        {/* TODO: spinner */}
        {isLoading && <>Идет загрузка ингредиентов...</>}
        {/* TODO: show error */}
        {isError && <>Ошибка при загрузке ингредиентов</>}
        {data && (
          <main className={`${styles.main} pr-5 pl-5`}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
          </main>
        )}
      </>
    </div>
  );
}

export default App;
