import { useState } from 'react';
import { Link } from 'react-router-dom';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`}>
        <EmailInput onChange={onChangeEmail} value={email} name='email' isIcon={false} placeholder='Укажите e-mail' />
        <Button htmlType='submit' type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      <span className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль? <Link to='/login'>Войти</Link>
      </span>
    </main>
  );
}
