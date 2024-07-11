import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`}>
        <PasswordInput onChange={onChangePassword} value={password} name='password' placeholder='Введите новый пароль' />
        <Input onChange={onChangeCode} value={code} name='code' placeholder='Введите код из письма' />
        <Button htmlType='submit' type='primary' size='medium'>
          Сохранить
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль? <Link to='/login'>Войти</Link>
      </span>
    </main>
  );
}
