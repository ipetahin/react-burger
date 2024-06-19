import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.ingredient}>
      <img src={image_large} alt={name} />
      <span className='text text_type_main-medium mt-4'>{name}</span>
      <div className={styles.nutrition}>
        <div className={styles.nutrition_item}>
          <span className='text text_type_main-default'>Калории, ккал</span>
          <span className='text text_type_digits-default'>{calories}</span>
        </div>
        <div className={styles.nutrition_item}>
          <span className='text text_type_main-default'>Белки, г</span>
          <span className='text text_type_digits-default'>{proteins}</span>
        </div>
        <div className={styles.nutrition_item}>
          <span className='text text_type_main-default'>Жиры, г</span>
          <span className='text text_type_digits-default'>{fat}</span>
        </div>
        <div className={styles.nutrition_item}>
          <span className='text text_type_main-default'>Углеводы, г</span>
          <span className='text text_type_digits-default'>{carbohydrates}</span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
