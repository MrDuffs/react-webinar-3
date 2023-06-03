import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({error, onSubmit, t}) {

  const cn = bem('LoginForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    const [login, password] = e.target;
    onSubmit(login.value, password.value);
  };

  return (
      <form className={cn()} onSubmit={handleSubmit}>
        <div className={cn('title')}>{t('login.title')}</div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('login.login')}</div>
          <Input value='' />
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('login.password')}</div>
          <Input value=''/>
        </div>
        {error ?
          <div className={cn('prop')}>
            <div className={cn('error')}>{error}</div>
          </div>
        : null}
        <button type='submit'>{t('login.submit')}</button>
      </form>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func
};

LoginForm.defaultProps = {
  t: (text) => text
}

export default memo(LoginForm);
