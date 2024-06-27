import styles from './constructor-list.module.css';
import ConstructorItem from '../constructor-item/constructor-item';
import ConstructorItemSkeleton from '../constructor-item-skeleton/constructor-item-skeleton';
import { ingredientsPropType } from '../../../utils/prop-types';
import { useDrop } from 'react-dnd';

const ConstructorList = ({ bun, ingredients, onDropHandler }) => {
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      onDropHandler(ingredient);
    },
  });

  const addBun = (position) =>
    bun ? (
      <ConstructorItem ingredient={bun} position={position} extraClass={styles.fix_item} />
    ) : (
      <ConstructorItemSkeleton text='Выберите булки' position={position} extraClass={styles.fix_item} />
    );

  return (
    <section className='mb-10' ref={dropTarget}>
      {addBun('top')}

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

      {addBun('bottom')}
    </section>
  );
};

ConstructorList.propTypes = {
  ingredients: ingredientsPropType,
};

export default ConstructorList;
