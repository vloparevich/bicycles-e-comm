import React, { useState } from 'react';
import { signup, generateManagerToken } from '../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { SignupManagerSelectorButtons } from './../components/Forms/SignupManagerSelectorButtons';
import { SignupFormManagerHasNoToken } from './../components/Forms/SignupFormManagerHasNoToken';
import { SignupCommonForm } from '../components/Forms/SignupCommonForm';
import { SignupFormMainButtons } from './../components/Forms/SignupFormMainButtons';
import ModalMessage from '../components/UI/ModalMessage';
import * as PATHS from '../utils/paths';
import * as USER_HELPERS from '../utils/userToken';
import './Auth.scss';

export default function Signup({ authenticate, ...props }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [managerId, setManagerId] = useState('');
  const [arePassowrdsMatched, setArePassowrdsMatched] = useState(true);
  const [inputError, setInputError] = useState(null);
  const [userType, setUserType] = useState({
    isManager: false,
  });
  const [managerForm, setManagerForm] = useState({
    yesIsClicked: false,
    noIsClicked: false,
    hasToken: false,
  });

  const [response, setResponse] = useState('');
  const isCurrentUserManager = props.user?.isManager;

  const navigate = useNavigate();

  function handleFormSubmission(event) {
    event.preventDefault();
    if (password !== confirmedPassword) {
      setInputError("Passwords don't match");
      setArePassowrdsMatched(false);
      navigate(PATHS.SIGNUPPAGE);
    } else {
      const credentials = {
        fullName: fullName,
        username: email,
        password: password,
        isManager: userType.isManager,
        managerId: userType.isManager ? managerId : null,
      };

      signup(credentials).then((res) => {
        if (!res.status) {
          alert(res.errorMessage);
          window.location.reload();
        }
        if (isCurrentUserManager) {
          navigate(PATHS.USERS_RENTALS);
        } else {
          USER_HELPERS.setUserToken(res.data.accessToken);
          authenticate(res.data.user);
          navigate(PATHS.HOMEPAGE);
        }
      });
    }
  }

  const managerTokenHandler = () => {
    generateManagerToken({ username: email }).then((res) => {
      if (!res.status) {
        alert(res.errorMessage);
      }
    });

    setManagerForm(() => {
      return {
        yesIsClicked: true,
        noIsClicked: false,
        hasToken: true,
      };
    });
    setEmail('');
  };

  const userTypeSelectionHandler = (isAdmin) => {
    setUserType(() => {
      if (isAdmin) {
        return {
          isManager: true,
        };
      }
      return {
        isManager: false,
      };
    });
  };

  const errorMessageHandler = () => setResponse(() => '');

  const yesNoFormHandler = (hasId) => {
    setManagerForm(() => {
      if (hasId) {
        return {
          yesIsClicked: true,
          noIsClicked: false,
          hasToken: hasId,
        };
      } else {
        return {
          yesIsClicked: false,
          noIsClicked: true,
          hasToken: hasId,
        };
      }
    });
  };

  return (
    <React.Fragment>
      <ModalMessage
        message={response?.errorMessage}
        resetModalMessage={errorMessageHandler}
      />

      <div className='auth-container'>
        <SignupFormMainButtons
          userTypeSelectionHandler={userTypeSelectionHandler}
          userType={userType}
        />
        {inputError && <p id='input-error-message'>{inputError}</p>}
        {!userType.isManager && (
          <SignupCommonForm
            fullName={fullName}
            email={email}
            password={password}
            token={managerId}
            userType={userType}
            setEmail={setEmail}
            setPassword={setPassword}
            setToken={setManagerId}
            handleFormSubmission={handleFormSubmission}
            confirmedPassword={confirmedPassword}
            setConfirmedPassword={setConfirmedPassword}
            arePassowrdsMatched={arePassowrdsMatched}
            setFullName={setFullName}
          />
        )}
        {userType.isManager &&
          !managerForm.noIsClicked &&
          !managerForm.yesIsClicked && (
            <SignupManagerSelectorButtons yesNoFormHandler={yesNoFormHandler} />
          )}
        {userType.isManager && managerForm.yesIsClicked && (
          <SignupCommonForm
            fullName={fullName}
            email={email}
            password={password}
            token={managerId}
            userType={userType}
            arePassowrdsMatched={arePassowrdsMatched}
            confirmedPassword={confirmedPassword}
            setFullName={setFullName}
            setEmail={setEmail}
            setPassword={setPassword}
            setToken={setManagerId}
            handleFormSubmission={handleFormSubmission}
            setConfirmedPassword={setConfirmedPassword}
            isManager={userType.isManager}
          />
        )}
        {userType.isManager &&
          !managerForm.hasToken &&
          managerForm.noIsClicked && (
            <SignupFormManagerHasNoToken
              handleFormSubmission={handleFormSubmission}
              managerTokenHandler={managerTokenHandler}
              setEmail={setEmail}
              email={email}
            />
          )}
      </div>
      <div className='authCreateAccountContainer'>
        Already have an 'RideForFix' account?
        <Link to='/auth/login'>
          <b> Log In</b>
        </Link>
      </div>
    </React.Fragment>
  );
}
