import { ManagersControlButtons } from '../Controls/ManagersControlButtons.component';

export const UserDetails = (props) => {
  const isUserManager = props.user.isManager;
  const isEntityManager = props.isManager;

  const { fullName, username } = props;

  return (
    <div className='user-details-section'>
      <div>
        <div>
          User:
          <span id='user-fullname'>
            {' '}
            {isUserManager ? (isEntityManager ? 'Admin' : 'Customer') : ''}
          </span>
        </div>
        <div>
          Name: <span id='user-fullname'>{fullName}</span>
        </div>
        <div>
          Username: <span id='user-username'>{username}</span>
        </div>
        <ManagersControlButtons {...props} />
      </div>
    </div>
  );
};
