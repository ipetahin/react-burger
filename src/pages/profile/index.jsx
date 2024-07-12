import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { logoutUser } from '../../services/slices/user-slice';
import useFormData from '../../hooks/use-form-data';
import styles from './profile.module.css';

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  const [disabled, setDisabled] = useState(true);
  const [formData, onChangeFormData] = useFormData(user);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/');
  };

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleInputNameDisabled = () => {
    setDisabled(true);
  };

  return (
    <main className={styles.main}>
      <menu className={styles.menu}>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink to='' className={({ isActive }) => (isActive ? styles.link : `${styles.link} ${styles.inactive}`)} end>
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink to='history' className={({ isActive }) => (isActive ? styles.link : `${styles.link} ${styles.inactive}`)} end>
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink to='logout' className={({ isActive }) => (isActive ? styles.link : `${styles.link} ${styles.inactive}`)} onClick={handleLogout}>
            Выход
          </NavLink>
        </li>
        <span className='text text_type_main-default text_color_inactive mt-20'>В этом разделе вы можете изменить свои персональные данные</span>
      </menu>
      {user && location.pathname === '/profile' ? (
        <form className={styles.form}>
          <Input
            onChange={onChangeFormData}
            value={formData.name}
            type='text'
            name='name'
            placeholder='Имя'
            icon='EditIcon'
            ref={inputRef}
            onIconClick={handleIconClick}
            onBlur={handleInputNameDisabled}
            disabled={disabled}
          />
          <EmailInput onChange={onChangeFormData} value={formData.email} name='email' isIcon={true} />
          <PasswordInput onChange={onChangeFormData} value={formData.password} name='password' isIcon={true} icon='EditIcon' />
        </form>
      ) : (
        <Outlet />
      )}
    </main>
  );
}
