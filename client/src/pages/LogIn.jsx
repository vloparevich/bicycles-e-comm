import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import * as PATHS from '../utils/paths';
import * as USER_HELPERS from '../utils/userToken';
import './LogIn.styles.scss';

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const { username, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: 'Invalid credentials' });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className='login-form-container'>
      <h1>Log In</h1>
      <form onSubmit={handleFormSubmission}>
        <div>
          <label htmlFor='input-username'>Username </label>
          <Input
            id='input-username'
            type='text'
            name='username'
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='input-password'>Password </label>
          <Input
            id='input-password'
            type='password'
            name='password'
            value={password}
            onChange={handleInputChange}
            required
            minLength='8'
          />
        </div>

        {error && (
          <div className='error-block'>
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
        <div className='formSubmitButtonContainer'>
          <Button variant='contained' color='primary' mt={1} type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
