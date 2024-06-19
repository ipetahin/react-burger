import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavList from './nav-list/nav-list';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        <Logo />
      </span>
      <NavList />
    </header>
  );
};

export default AppHeader;
