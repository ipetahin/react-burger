import NavItem from '../nav-item/nav-item';
import styles from './nav-list.module.css';

const NavList = () => {
  return (
    <nav className={`${styles.nav} pt-4 pb-4`}>
      <ul className={styles.list}>
        <NavItem iconType='burger' text='Конструктор' active/>
        <NavItem iconType='list' text='Лента заказов' />
        <NavItem iconType='profile' text='Личный кабинет' />
      </ul>
    </nav>
  );
};

export default NavList;
