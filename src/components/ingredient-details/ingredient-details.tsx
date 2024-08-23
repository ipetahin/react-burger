import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import { resetData, setData } from '../../services/slices/ingredient-details-slice';
import styles from './ingredient-details.module.css';
import { useDispatch, useSelector } from '../../services/hooks';

const IngredientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: ingredient } = useSelector((store) => store.ingredientDetails);
  const { isLoading, data: ingredients } = useSelector((store) => store.burgerIngredients);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!ingredient && ingredients) {
      const currentIngredient = ingredients.find((ingredient) => ingredient._id === id);
      if (currentIngredient) dispatch(setData(currentIngredient));
    }
  }, [ingredients, id, dispatch, ingredient]);

  return (
    <div className={styles.ingredient}>
      <GridLoader color='#fff' loading={isLoading} cssOverride={{ position: 'absolute', top: '50%', left: '50%', transform: "translate('-50%', '-50%')" }} />
      {ingredient && (
        <>
          <h2 className={`${styles.header} mt-10 ml-10 mr-10 text text_type_main-large`}>Детали ингредиента</h2>
          <img src={ingredient.image_large} alt={ingredient.name} />
          <span className='text text_type_main-medium mt-4'>{ingredient.name}</span>
          <div className={styles.nutrition}>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
              <span className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
