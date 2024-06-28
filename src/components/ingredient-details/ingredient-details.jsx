import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetData } from '../../services/slices/ingredient-details-slice';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const { name, image_large, calories, proteins, fat, carbohydrates } = useSelector((store) => store.ingredientDetails.data);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ingredient}>
      {name && (
        <>
          <img src={image_large} alt={name} />
          <span className='text text_type_main-medium mt-4'>{name}</span>
          <div className={styles.nutrition}>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
              <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
            </div>
            <div className={styles.nutrition_item}>
              <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
              <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
