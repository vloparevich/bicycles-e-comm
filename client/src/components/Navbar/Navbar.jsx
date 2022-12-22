import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as PATHS from '../../utils/paths';
import * as CONSTS from '../../utils/consts';
import './Navbar.css';

const Navbar = (props) => {
  const uiDataSlice = useSelector((state) => state.uiDetailsData);

  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? 'yellow' : '#61dafb',
    };
  };

  const ManagerLinks = () => {
    return (
      <Fragment>
        <NavLink
          to={PATHS.BICYCLEFORM}
          className='authLink'
          style={navLinkStyle}
        >
          {props.user.isManager && 'Add New Bike'}
        </NavLink>
        <NavLink
          to={PATHS.SIGNUPPAGE}
          className='authLink'
          style={navLinkStyle}
        >
          {props.user.isManager && 'Add New User'}
        </NavLink>
        <NavLink
          to={PATHS.USERS_RENTALS}
          className='authLink'
          style={navLinkStyle}
        >
          {props.user.isManager && 'Users And Their Rentals'}
        </NavLink>
      </Fragment>
    );
  };

  const UserLinks = () => {
    return (
      <Fragment>
        <NavLink
          className='authLink'
          to={PATHS.MY_RENTALS}
          style={navLinkStyle}
        >
          My Rentals
        </NavLink>
      </Fragment>
    );
  };

  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className='nav__projectName'>
        {CONSTS.CAPITALIZED_APP} 🎃
      </Link>
      <Link to={PATHS.HOMEPAGE} className='authLink'>
        Home
      </Link>
      <div className='nav__authLinks'>
        {props.user ? (
          <Fragment>
            {props.user.isManager ? <ManagerLinks /> : <UserLinks />}
            <NavLink
              to={PATHS.PROFILEPAGE}
              className='authLink'
              style={navLinkStyle}
            >
              {props.user.isManager ? 'Manager' : 'Renter'} (
              {uiDataSlice.fullName})
            </NavLink>
            <button className='nav-logoutbtn' onClick={props.handleLogout}>
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link to={PATHS.SIGNUPPAGE} className='authLink'>
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className='authLink'>
              Log In
            </Link>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
