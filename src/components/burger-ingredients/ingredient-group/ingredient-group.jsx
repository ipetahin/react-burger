import { forwardRef } from 'react';
import styles from './ingredient-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { ingredientGroupPropType } from '../../../utils/prop-types';

const IngredientGroup = forwardRef(({ ingredients, title, type }, ref) => {
  return (
    <section>
      <h2 className='text text_type_main-medium' ref={ref}>{title}</h2>
      <ul className={`${styles.group} mt-6 mr-2 mb-10 ml-4`}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <IngredientItem key={ingredient._id} ingredient={ingredient} counter={1} />
          ))}
      </ul>
    </section>
  );
});

IngredientGroup.propTypes = {
  ...ingredientGroupPropType,
};

export default IngredientGroup;
