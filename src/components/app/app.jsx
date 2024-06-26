import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <>
        <AppHeader />
        <main className={`${styles.main} pr-5 pl-5`}>
          <BurgerIngredients />
          {/* <BurgerConstructor /> */}
        </main>
      </>
    </div>
  );
}

export default App;
