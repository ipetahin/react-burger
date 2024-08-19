import { useEffect } from 'react';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';
import { useDispatch } from '../../services/hooks';

export default function IngredientPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.ingredient}>
      <IngredientDetails />
    </main>
  );
}
