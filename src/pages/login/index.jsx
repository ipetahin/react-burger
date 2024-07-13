import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/slices/user-slice';

export default function LoginPage() {
  const [formData, onChangeFormData, checkFormData] = useFormData({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isError = e.target.querySelector('.input__error');
    if (isError) return;

    if (checkFormData.status) {
      dispatch(loginUser(formData));
    } else {
      e.target.querySelector(`[name=${checkFormData.field}]`).closest('.input').classList.add('input_status_error');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <EmailInput onChange={onChangeFormData} value={formData.email} name='email' isIcon={false} />
        <PasswordInput onChange={onChangeFormData} value={formData.password} name='password' />
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
