import { useEffect, useState } from 'react';

export const Users = (props) => {
  const userId = props.user._id;
  const [usersWithBookings, setUsersWithBookings] = useState([]);

  return <div>List of users</div>;
};
