import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './register.module.css';

export default function RegisterPage() {
  const [formData, onChangeFormData] = useFormData({ username: '', email: '', password: '' });

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className={`${styles.form} mt-6 mb-20`}>
        <Input onChange={onChangeFormData} value={formData.username} name='username' type='text' placeholder='Имя' />
        <EmailInput onChange={onChangeFormData} value={formData.email} name='email' isIcon={false} />
        <PasswordInput onChange={onChangeFormData} value={formData.password} name='password' />
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
