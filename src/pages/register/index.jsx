import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className={`${styles.form} mt-6 mb-20`}>
        <Input onChange={onChangeUsername} value={username} name='username' type='text' placeholder='Имя' />
        <EmailInput onChange={onChangeEmail} value={email} name='email' isIcon={false} />
        <PasswordInput onChange={onChangePassword} value={password} name='password' />
        <Button htmlType='submit' type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы? <Link to='/login'>Войти</Link>
      </span>
    </main>
  );
}
