import { Link, useNavigate } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import useFormData from '../../hooks/use-form-data';
import styles from './register.module.css';
import { register } from '../../utils/api';

export default function RegisterPage() {
  const [formData, onChangeFormData, checkFormData] = useFormData({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isError = e.target.querySelector('.input__error');
    if (isError) return;

    if (checkFormData.status) {
      register(formData)
        .then(() => navigate('/login', { replace: true }))
        .catch((err) => {
          const error = Object.assign(document.createElement('p'), { className: 'input__error text_type_main-default', textContent: err.message });
          const input = e.target.querySelector('[name="password"]').closest('.input');
          input.closest('.input__container').append(error);
          setTimeout(() => {
            error.remove();
          }, 2000);
        });
    } else {
      e.target.querySelector(`[name=${checkFormData.field}]`).closest('.input').classList.add('input_status_error');
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <Input onChange={onChangeFormData} value={formData.name} name='name' type='text' placeholder='Имя' />
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
