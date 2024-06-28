import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { removeIngredient, sortIngredients } from '../../../services/slices/burger-сonstructor-slice';
import { constructorItemPropType } from '../../../utils/prop-types';
import styles from './constructor-item.module.css';

const ConstructorItem = memo(function ConstructorItem({ id, ingredient, moveIngredient, findIngredient }) {
  const dispatch = useDispatch();

  const originalIndex = findIngredient(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'constructorIngredient',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIngredient(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveIngredient]
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'constructorIngredient',
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findIngredient(id);
          moveIngredient(draggedId, overIndex);
        }
      },
      drop(item) {
        dispatch(sortIngredients({ fromIndex: item.originalIndex, toIndex: findIngredient(item.id).index }));
      },
    }),
    [findIngredient, moveIngredient]
  );
  const opacity = isDragging ? 0 : 1;

  const handleDeleteIngredient = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <li className={styles.item} style={{ opacity }} ref={(node) => drag(drop(node))}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        extraClass={styles.element}
        handleClose={() => handleDeleteIngredient(ingredient)}
      />
    </li>
  );
});

ConstructorItem.propTypes = {
  ...constructorItemPropType,
};

export default ConstructorItem;
