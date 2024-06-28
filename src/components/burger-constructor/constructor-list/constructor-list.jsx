import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import ConstructorItem from '../constructor-item/constructor-item';
import ConstructorItemBun from '../constructor-item-bun/constructor-item-bun';
import ConstructorItemSkeleton from '../constructor-item-skeleton/constructor-item-skeleton';
import { ingredientsPropType } from '../../../utils/prop-types';
import styles from './constructor-list.module.css';

const ConstructorList = memo(({ onDropHandler }) => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const [constructorIngredients, setConstructorIngredients] = useState(ingredients);

  useEffect(() => {
    setConstructorIngredients(ingredients);
  }, [ingredients]);

  const findIngredient = useCallback(
    (id) => {
      const ingredient = constructorIngredients.filter((ingredient) => ingredient.id === id)[0];
      return {
        ingredient,
        index: constructorIngredients.indexOf(ingredient),
      };
    },
    [constructorIngredients]
  );

  const moveIngredient = useCallback(
    (id, atIndex) => {
      const { ingredient, index } = findIngredient(id);
      setConstructorIngredients(
        update(constructorIngredients, {
          $splice: [
            [index, 1],
            [atIndex, 0, ingredient],
          ],
        })
      );
    },
    [findIngredient, constructorIngredients]
  );

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      onDropHandler(ingredient);
    },
  });

  const addBun = (position) =>
    bun ? (
      <ConstructorItemBun ingredient={bun} position={position} extraClass={styles.fix_item} />
    ) : (
      <ConstructorItemSkeleton text='Выберите булки' position={position} extraClass={styles.fix_item} />
    );

  return (
    <section className='mb-10' ref={dropTarget}>
      {addBun('top')}

      <ul className={`${styles.list}`}>
        {constructorIngredients.length ? (
          constructorIngredients.map((ingredient) => (
            <ConstructorItem key={ingredient.id} id={ingredient.id} ingredient={ingredient} moveIngredient={moveIngredient} findIngredient={findIngredient} />
          ))
        ) : (
          <ConstructorItemSkeleton text='Выберите начинку и соусы' />
        )}
      </ul>

      {addBun('bottom')}
    </section>
  );
});

ConstructorList.propTypes = {
  ingredients: ingredientsPropType,
};

export default ConstructorList;
