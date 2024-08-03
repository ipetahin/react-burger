import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getIngredients } from '../../services/slices/burger-ingredients-slice';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';

export default function IngredientPage() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <main className={styles.ingredient}>
      <IngredientDetails />
    </main>
  );
}
