import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export const SignupFormManagerHasNoToken = ({
  managerTokenHandler,
  setEmail,
  email,
}) => {
  return (
    <div>
      <div>
        <label htmlFor='email'>Your Email</label>
        <Input
          type='email'
          id='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div></div>
      <Button
        variant='contained'
        color='primary'
        mt={1}
        type='submit'
        className='formSubmitButtonContainer'
        onClick={() => managerTokenHandler(email)}
      >
        Acquire my Employee ID
      </Button>
    </div>
  );
};
