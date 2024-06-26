import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const ingredientsPropType = PropTypes.arrayOf(ingredientPropType);

export const modalPropType = {
  text: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.element,
};

export const modalOverlayPropType = {
  onClick: PropTypes.func,
};

export const ingredientItemPropType = {
  ingredient: ingredientPropType,
  counter: PropTypes.number,
};

export const ingredientGroupPropType = {
  ingredients: ingredientsPropType,
  name: PropTypes.string,
  type: PropTypes.string,
};

export const constructorItemPropType = {
  ingredient: ingredientPropType,
  position: PropTypes.string,
  extraClass: PropTypes.string,
};

export const constructorItemSkeletonPropType = {
  text: PropTypes.string.isRequired,
  position: PropTypes.string,
  extraClass: PropTypes.string,
};

export const navItemPropType = {
  iconType: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  active: PropTypes.bool,
};
