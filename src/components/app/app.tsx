import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import ingredients from '../../utils/data.json';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pr-5 pl-5`}>
        <BurgerIngredients ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
