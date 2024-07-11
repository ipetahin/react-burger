import NavItem from '../nav-item/nav-item';
import styles from './nav-list.module.css';

const NavList = () => {
  return (
    <nav className={`${styles.nav} pt-4 pb-4`}>
      <ul className={styles.list}>
        <NavItem type='burger' text='Конструктор' link='/'/>
        <NavItem type='list' text='Лента заказов' link='/list' />
        <NavItem type='profile' text='Личный кабинет' link='/profile' />
      </ul>
    </nav>
  );
};

export default NavList;
