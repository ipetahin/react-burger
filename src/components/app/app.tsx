import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

import useFetch from '../../hooks/use-fetch';

function App() {
  const { isLoading, isError, data } = useFetch('ingredients');

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
