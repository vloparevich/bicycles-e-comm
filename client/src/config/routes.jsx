import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/LogIn';
import Signup from '../pages/Signup';
import ProfilePage from '../pages/ProfilePage';
import { AddNewBicycle } from '../pages/BicycleForm/AddNewBicycle';
import { Rentals } from '../pages/Rentals/Rentals.component';
import { UserRentals } from '../pages/UserRentals/UserRentals.component';
import { Users } from '../pages/Users/Users.component';
import * as PATHS from '../utils/paths';

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },

    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },

    {
      path: PATHS.PROFILEPAGE,
      element: user ? (
        <ProfilePage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.USERS,
      element: user?.isManager ? (
        <Users {...props} />
      ) : (
        <Navigate to={PATHS.HOMEPAGE} replace />
      ),
    },
    {
      path: PATHS.BICYCLEFORM,
      element: user?.isManager ? (
        <AddNewBicycle {...props} />
      ) : (
        <Navigate to={PATHS.HOMEPAGE} replace />
      ),
    },
    {
      path: PATHS.USERS_RENTALS,
      element: user?.isManager ? (
        <Rentals {...props} />
      ) : (
        <Navigate to={PATHS.HOMEPAGE} replace />
      ),
    },
    {
      path: PATHS.MY_RENTALS,
      element: !user?.isManager ? (
        <UserRentals {...props} />
      ) : (
        <Navigate to={PATHS.HOMEPAGE} replace />
      ),
    },
  ];
};

export default routes;
