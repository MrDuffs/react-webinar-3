import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthBar(props) {
  const cn = bem('AuthBar');

  return (
      <div className={cn()}>
        <button className={cn('logIn')}>Войти</button>
      </div>
  );
}

export default memo(AuthBar);
