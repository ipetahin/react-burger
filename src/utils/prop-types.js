import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  id: PropTypes.string,
});

export const ingredientsPropType = PropTypes.arrayOf(ingredientPropType);

export const constructorItemPropType = {
  ingredient: ingredientPropType.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  findIngredient: PropTypes.func.isRequired,
};

export const constructorItemBunPropType = {
  ingredient: ingredientPropType.isRequired,
  position: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export const constructorItemSkeletonPropType = {
  text: PropTypes.string.isRequired,
  position: PropTypes.string,
  extraClass: PropTypes.string,
};

export const constructorListPropType = {
  onDropHandler: PropTypes.func.isRequired,
};

export const ingredientItemPropType = {
  ingredient: ingredientPropType,
};

export const modalPropType = {
  children: PropTypes.element,
};

export const modalOverlayPropType = {
  onClick: PropTypes.func,
};

export const protectedRouteElementPropType = {
  component: PropTypes.element.isRequired,
  onlyAuth: PropTypes.bool,
};
