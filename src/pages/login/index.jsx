import { useState } from 'react';
import { Link } from 'react-router-dom';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <form className={`${styles.form} mt-6 mb-20`}>
        <EmailInput onChange={onChangeEmail} value={email} name='email' isIcon={false} />
        <PasswordInput onChange={onChangePassword} value={password} name='password' />
        <Button htmlType='submit' type='primary' size='medium'>
          Войти
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
      </span>
      <span className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
      </span>
    </main>
  );
}
