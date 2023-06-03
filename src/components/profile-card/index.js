import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ProfileCard({user, t}) {
  const cn = bem('ProfileCard');

  return (
      <div className={cn()}>
        <div className={cn('title')}>{t('profile.title')}</div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.name')}:</div>
          <div className={cn('value')}>{user.profile?.name}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('profile.phone')}:</div>
          <div className={cn('value')}>{user.profile?.phone}</div>
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>email:</div>
          <div className={cn('value')}>{user.email}</div>
        </div>
      </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.object
  }),
  t: PropTypes.func
};

ProfileCard.defaultProps = {
  t: (text) => text
};

export default memo(ProfileCard);
