import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-item.module.css';
import { navItemPropType } from '../../../utils/prop-types';

const NavItem = ({ iconType, text, link = '/', active }) => {
  let icon;

  switch (iconType) {
    case 'burger':
      icon = <BurgerIcon type={active ? 'primary' : 'secondary'} />;
      break;
    case 'list':
      icon = <ListIcon type={active ? 'primary' : 'secondary'} />;
      break;
    case 'profile':
      icon = <ProfileIcon type={active ? 'primary' : 'secondary'} />;
      break;
    default:
      icon = null;
  }

  return (
    <li className={`${styles.item}`}>
      <a href={link} className={`${styles.link} pt-4 pr-5 pb-4 pl-5 ${active ? '' : styles.inactive}`}>
        {icon}
        {text}
      </a>
    </li>
  );
};

NavItem.propTypes = {
  ...navItemPropType,
};

export default NavItem;
