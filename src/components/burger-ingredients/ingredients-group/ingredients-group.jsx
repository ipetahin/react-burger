import styles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

const IngredientsGroup = ({ ingredients = [], name, type }) => {
  return (
    <section>
      <h2 className='text text_type_main-medium'>{name}</h2>
      <ul className={`${styles.group} mt-6 mr-2 mb-10 ml-4`}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <IngredientItem
              key={ingredient._id}
              name={ingredient.name}
              image={ingredient.image}
              price={ingredient.price}
              counter={['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9b4', '60666c42cc7b410027a1a9bc'].includes(ingredient._id) && 1}
            />
          ))}
      </ul>
    </section>
  );
};

export default IngredientsGroup;
