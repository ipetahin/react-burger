import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';
import { useEffect, useState } from 'react';

const URL_API = 'https://norma.nomoreparties.space/api';

function App() {
  const [ingredients, setIngredients] = useState({ isLoading: true, isError: false, data: null });

  useEffect(() => {
    const getIngredientData = () => {
      fetch(`${URL_API}/ingredients`)
        .then((res) => res.json())
        .then((res) => res.success && setIngredients({ ...ingredients, isLoading: false, data: res.data }))
        .catch(() => setIngredients({ ...ingredients, isLoading: false, isError: true }));
    };
    getIngredientData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      {ingredients.isLoading && <>Идет загрузка ингредиентов...</>}
      {ingredients.isError && <>Ошибка при загрузке ингредиентов</>}
      {ingredients.data && (
        <>
          <AppHeader />
          <main className={`${styles.main} pr-5 pl-5`}>
            <BurgerIngredients ingredients={ingredients.data} />
            <BurgerConstructor ingredients={ingredients.data} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
