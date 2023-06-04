import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import Input from '../input';
import PropTypes from 'prop-types';
import './style.css';
import Spinner from '../spinner';

function LoginForm({error, onSubmit, waiting, t}) {

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const cn = bem('LoginForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginValue, passwordValue);
  };

  return (
      <form className={cn()} onSubmit={handleSubmit}>
        <div className={cn('title')}>{t('login.title')}</div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('login.login')}</div>
          <Input value={loginValue} onChange={setLoginValue}/>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('login.password')}</div>
          <Input value={passwordValue} onChange={setPasswordValue}/>
        </div>
        <Spinner active={waiting}>
          {error ?
              <div className={cn('prop')}>
                <div className={cn('error')}>{error}</div>
              </div>
              : null}
          <button type='submit'>{t('login.submit')}</button>
        </Spinner>
      </form>
  );
}

LoginForm.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  waiting: PropTypes.bool
};

LoginForm.defaultProps = {
  t: (text) => text
}

export default memo(LoginForm);
