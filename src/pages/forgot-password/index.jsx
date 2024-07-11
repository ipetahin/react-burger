import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const [formData, onChangeFormData] = useFormData({ email: '' });

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`}>
        <EmailInput onChange={onChangeFormData} value={formData.email} name='email' isIcon={false} placeholder='Укажите e-mail' />
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
