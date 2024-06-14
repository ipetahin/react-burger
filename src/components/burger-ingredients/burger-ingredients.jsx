import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

import IngredientsGroup from './ingredients-group/ingredients-group';

const BurgerIngredients = ({ ingredients = [] }) => {
  return (
    <div className={`${styles.ingredients} pt-10 mb-10`}>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className='mb-10'>
        <Tab key='bunTab' active>Булки</Tab>
        <Tab key='sauceTab'>Соусы</Tab>
        <Tab key='mainTab'>Начинки</Tab>
      </div>
      <div className={`${styles.groups}`}>
        <IngredientsGroup key='bunGroup' ingredients={ingredients} name='Булки' type='bun' />
        <IngredientsGroup key='sauceGroup' ingredients={ingredients} name='Соусы' type='sauce' />
        <IngredientsGroup key='mainGroup' ingredients={ingredients} name='Начинки' type='main' />
      </div>
    </div>
  );
};

export default BurgerIngredients;
