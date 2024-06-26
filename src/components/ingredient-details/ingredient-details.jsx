import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingredient-details.module.css';
import { set, reset } from '../../services/slices/ingredient-details-slice';

const IngredientDetails = ({ ingredient }) => {
  const data = useSelector((store) => store.details.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set(ingredient));
    return () => {
      dispatch(reset());
    };
  }, [ingredient, dispatch]);

  return (
    <div className={styles.ingredient}>
      {data && (
        <>
          <img src={data.image_large} alt={data.name} />
          <span className='text text_type_main-medium mt-4'>{data.name}</span>
          <div className={styles.nutrition}>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
              <span className='text text_type_digits-default text_color_inactive'>{data.calories}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{data.proteins}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{data.fat}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{data.carbohydrates}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropType,
};

export default IngredientDetails;
