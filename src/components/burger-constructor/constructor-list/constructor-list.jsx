import styles from './constructor-list.module.css';
import ConstructorItem from '../constructor-item/constructor-item';
import ConstructorItemSkeleton from '../constructor-item-skeleton/constructor-item-skeleton';
import { ingredientsPropType } from '../../../utils/prop-types';


const ConstructorList = ({bun, ingredients}) => {

  return (
    <section className='mb-10'>
      {/* top bun */}
      {bun ? (
        <ConstructorItem key={bun.id} ingredient={bun} position='top' extraClass={styles.fix_item} />
      ) : (
        <ConstructorItemSkeleton text='Выберите булки' position='top' extraClass={styles.fix_item} />
      )}

      {/* ingredients */}
      <ul className={`${styles.list}`}>
        {ingredients.length ? (
          ingredients.map((ingredient) => (
            <li className={styles.item} key={ingredient.id}>
              <ConstructorItem key={ingredient._id} ingredient={ingredient} />
            </li>
          ))
        ) : (
          <ConstructorItemSkeleton text='Выберите начинку и соусы' />
        )}
      </ul>

      {/* bottom bun */}
      {bun ? (
        <ConstructorItem key={bun.id} ingredient={bun} position='bottom' extraClass={styles.fix_item} />
      ) : (
        <ConstructorItemSkeleton text='Выберите булки' position='bottom' extraClass={styles.fix_item} />
      )}
    </section>
  );
};

ConstructorList.propTypes = {
  ingredients: ingredientsPropType,
};

export default ConstructorList;
