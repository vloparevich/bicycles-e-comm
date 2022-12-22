import Button from '@mui/material/Button';

export const SignupFormMainButtons = ({
  userTypeSelectionHandler,
  userType,
}) => {
  return (
    <ul className='auth-top-bar'>
      <Button
        variant='contained'
        onClick={() => userTypeSelectionHandler()}
        id={
          userType.isManager
            ? 'inactive-renter-signup-toggle'
            : 'active-renter-signup-toggle'
        }
      >
        Renter
      </Button>
      <Button
        variant='contained'
        onClick={() => userTypeSelectionHandler(true)}
        id={
          userType.isManager
            ? 'active-renter-signup-toggle'
            : 'inactive-renter-signup-toggle'
        }
      >
        Manager
      </Button>
    </ul>
  );
};
