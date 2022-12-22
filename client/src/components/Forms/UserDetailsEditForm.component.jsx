import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './UserDetailsEditForm.styles.scss';

export const UserDetailsEditForm = ({
  handleFormSubmit,
  fullName,
  onInputChangeHandler,
  isManager,
}) => {
  const isFullNameEntered = fullName ? true : false;
  return (
    <div className='user-details-edit-form-container'>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='fullName'>
            {isManager ? '(Manager) ' : '(Renter) '}Full Name
          </label>
          <Input
            value={fullName}
            onChange={onInputChangeHandler}
            type='text'
            id='fullName'
            required
          />
        </div>
        <div className='formSubmitButtonContainer'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={!isFullNameEntered}
          >
            Update user's full name
          </Button>
        </div>
      </form>
    </div>
  );
};
