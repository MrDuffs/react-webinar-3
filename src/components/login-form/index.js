import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import './style.css';

function LoginForm({error, onSubmit}) {

  const cn = bem('LoginForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    const [login, password] = e.target;
    onSubmit(login.value, password.value);
  };

  return (
      <form className={cn()} onSubmit={handleSubmit}>
        <div className={cn('title')}>Вход</div>
        <div className={cn('login')}>
          <div className={cn('label')}>Логин</div>
          <Input value='' />
        </div>
        <div className={cn('password')}>
          <div className={cn('label')}>Пароль</div>
          <Input value=''/>
        </div>
        <button type='submit'>Войти</button>
        {error ? <div className={cn('error')}>{error}</div> : null}
      </form>
  );
}

export default memo(LoginForm);
