import { Link } from 'react-router-dom';
import * as PATHS from './../../utils/paths';

export const UserControl = (props) => {
  return (
    <div className='user-control-container'>
      <ul>
        <li>
          <Link to={PATHS.MY_RENTALS}>Current rentals</Link>
        </li>
      </ul>
    </div>
  );
};
