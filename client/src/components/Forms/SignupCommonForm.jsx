import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export const SignupCommonForm = ({
  setEmail,
  setPassword,
  setToken,
  email,
  password,
  token,
  userType,
  handleFormSubmission,
  confirmedPassword,
  setConfirmedPassword,
  arePassowrdsMatched,
  fullName,
  setFullName,
  isManager,
}) => {
  return (
    <form onSubmit={handleFormSubmission}>
      <div>
        <label htmlFor='fullName'>Full Name</label>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type='text'
          id='fullName'
          required
        />
      </div>
      <div>
        <label htmlFor='email'>Your Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          id='email'
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <Input
          error={!arePassowrdsMatched}
          type='password'
          id='password-manager'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Confirm Password</label>
        <Input
          error={!arePassowrdsMatched}
          type='password'
          id='confirm-password-manager'
          required
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
      </div>
      {isManager && (
        <div>
          <label htmlFor='managerId'>Token</label>
          <Input
            type='password'
            id='managerId'
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
      )}

      <div className='formSubmitButtonContainer'>
        <Button variant='contained' color='primary' mt={1} type='submit'>
          Create {userType.isManager ? "Manager's" : "Renter's"} account
        </Button>
      </div>
    </form>
  );
};
