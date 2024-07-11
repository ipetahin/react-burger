import { NavLink } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-item.module.css';
import { navItemPropType } from '../../../utils/prop-types';

const NavItem = ({ type, text, link = '/' }) => {
  const getIcon = (isActive) => {
    switch (type) {
      case 'burger':
        return <BurgerIcon type={isActive ? 'primary' : 'secondary'} />;
      case 'list':
        return <ListIcon type={isActive ? 'primary' : 'secondary'} />;
      case 'profile':
        return <ProfileIcon type={isActive ? 'primary' : 'secondary'} />;
      default:
        return null;
    }
  };

  return (
    <li className={`${styles.item}`}>
      <NavLink to={link} className={({ isActive }) => (isActive ? `${styles.link}` : `${styles.link} ${styles.inactive}`)}>
        {({ isActive }) => (
          <>
            {getIcon(isActive)}
            {text}
          </>
        )}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  ...navItemPropType,
};

export default NavItem;
