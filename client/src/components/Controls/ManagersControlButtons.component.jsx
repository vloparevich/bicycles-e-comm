import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditUserFormModal } from '../UI/Modal/EditUserFormModal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserAndReleaseBookings } from '../../services/users.service';
import { setBikesAndUsersThunk } from '../../store/user-rental-data-slice';
import { uiActions } from '../../store/ui-details-slice';

export const ManagersControlButtons = (props) => {
  const { userId, fullName } = props;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const renterId = props._id;
  const managerId = props.user._id;

  const updateHandler = (response) => {
    if (response.status) {
    } else {
      alert("User's full name has not been updated...");
    }
  };
  const editUserButtonHandler = () => setShow(true);

  const deleteUserAndReleaseBookingsHandler = async () => {
    const res = await deleteUserAndReleaseBookings(managerId, renterId);
    if (res.data.success) {
      dispatch(uiActions.setModalDetails(`User removed: ${fullName}`));
      dispatch(setBikesAndUsersThunk(managerId));
    }
  };

  return (
    <div className='controls-to-manage-user'>
      <Button
        color='secondary'
        variant='contained'
        onClick={() => editUserButtonHandler(userId)}
      >
        Edit
      </Button>
      <Button
        color='warning'
        variant='contained'
        onClick={deleteUserAndReleaseBookingsHandler}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <EditUserFormModal
        show={show}
        updateHandler={updateHandler}
        fullName={fullName}
        setShow={setShow}
        {...props}
      />
    </div>
  );
};
