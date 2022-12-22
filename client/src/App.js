import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/UI/Spinner';
import Navbar from './components/Navbar/Navbar';
import { getLoggedIn, logout } from './services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from './store/ui-details-slice';
import routes from './config/routes';
import * as PATHS from './utils/paths';
import * as USER_HELPERS from './utils/userToken';

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      dispatch(uiActions.setUserDetails(res.data.user));
      dispatch(uiActions.setUserFullName(res.data.user.fullName));

      setIsLoading(false);
    });
  }, [dispatch]);

  function handleLogout() {
    navigate(PATHS.HOMEPAGE);
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      dispatch(uiActions.setUserDetails(null));
      dispatch(uiActions.setUserFullName(null));
      return setIsLoading(false);
    }

    setIsLoading(true);

    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error('Logout was unsuccessful: ', res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      setUser(null);
      dispatch(uiActions.setUserDetails(null));
      dispatch(uiActions.setUserFullName(null));
    });
  }

  function authenticate(user) {
    setUser(user);
    dispatch(uiActions.setUserDetails(user));
    dispatch(uiActions.setUserFullName(user.fullName));
  }

  if (isLoading) return <Spinner />;

  return (
    <div className='App'>
      <Navbar handleLogout={handleLogout} user={user} />
      <Routes>
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}
