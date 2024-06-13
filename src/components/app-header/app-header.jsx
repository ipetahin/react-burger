import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import NavList from './nav-list/nav-list';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <NavList />
    </header>
  );
};

export default AppHeader;
