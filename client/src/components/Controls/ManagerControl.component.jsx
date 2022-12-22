import * as PATHS from './../../utils/paths';
import { Link } from 'react-router-dom';

export const ManagerControl = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={PATHS.BICYCLEFORM}>Add Bicycle</Link>
        </li>
        <li>
          <Link to={PATHS.USERS_RENTALS}>Users with bookings</Link>
        </li>
        <li>
          <Link to={PATHS.USERS}>List of all the registered users</Link>
        </li>
      </ul>
    </div>
  );
};
