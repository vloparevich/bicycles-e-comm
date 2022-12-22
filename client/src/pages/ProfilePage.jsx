import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUserDetails } from './../services/users.service';
import { UserDetailsEditForm } from '../components/Forms/UserDetailsEditForm.component';
import { setuserFullNameThunk } from './../store/ui-details-slice';
import * as PATHS from '../utils/paths';

// function MyForm({ user }) {
//   const [changes, setChanges] = useState({});

//   const formData = { ...user, ...changes };

//   return (
//       <input type={'text'} value={user.fullName} onChange={e => setChanges({ ...changes, fullName: e.target.value })} />
//   )
// }

function ProfilePage(props) {
  const [userId, setUserId] = useState('');
  const [usersFullName, setUsersFullName] = useState(props.user.fullName);

  const uiDataSlice = useSelector((state) => state.uiDetailsData);

  const [inputData, setInputData] = useState({});

  const inputChangeHandler = (e) => {
    setInputData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <input
      type={'text'}
      value={inputData.fullName}
      name='fullName'
      onChange={inputChangeHandler}
    />
  );

  useEffect(() => {
    if (uiDataSlice.fullName) {
      setUsersFullName(uiDataSlice.fullName);
    }
  }, [uiDataSlice]);

  useEffect(() => {
    setUserId(props.user._id);
  }, [props.user._id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUserDetails(userId, usersFullName);
    if (res.status) {
      dispatch(setuserFullNameThunk(usersFullName));
    }
    navigate(PATHS.HOMEPAGE);
  };

  const onInputChangeHandler = (e) => {
    const value = e.target.value;
    setUsersFullName(value);
  };
  return (
    <div>
      <UserDetailsEditForm
        handleFormSubmit={handleFormSubmit}
        setFullName={setUsersFullName}
        userFullName={usersFullName}
        onInputChangeHandler={onInputChangeHandler}
        fullName={usersFullName}
        isManager={props.user.isManager}
      />
    </div>
  );
}

export default ProfilePage;
