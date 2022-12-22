import Button from '@mui/material/Button';

export const SignupManagerSelectorButtons = ({ yesNoFormHandler }) => {
  return (
    <div className='formSubmitButtonContainer'>
      <h3>Do you know your Employee ID</h3>
      <div id='yesNoButtons'>
        <Button
          variant='contained'
          color='success'
          onClick={() => yesNoFormHandler(true)}
        >
          Yes
        </Button>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => yesNoFormHandler(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
};
