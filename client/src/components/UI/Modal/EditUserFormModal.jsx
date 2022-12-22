import { useState, useEffect } from 'react';
import { UserDetailsEditForm } from '../../Forms/UserDetailsEditForm.component';
import { updateUserDetails } from '../../../services/users.service';
import { useDispatch } from 'react-redux';
import { setBikesAndUsersThunk } from '../../../store/user-rental-data-slice';
import Button from '@mui/material/Button';
import './Modal.scss';

export const EditUserFormModal = ({
  show,
  handleSubmit,
  fullName,
  setShow,
  ...props
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const { _id: userId } = props;
  const managerId = props.user._id;

  const [userFullName, setUserFullName] = useState(fullName);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fullName) {
      setUserFullName(fullName);
    }
  }, [fullName]);

  useEffect(() => {
    if (isModalClosed) {
      setUserFullName(fullName);
    }
  }, [isModalClosed, fullName]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(userId, userFullName);
    dispatch(setBikesAndUsersThunk(managerId));
    setShow(false);
  };

  const onInputChangeHandler = (e) => {
    const value = e.target.value;
    setUserFullName(value);
  };

  const closeModalHandler = () => {
    setShow(false);
    setIsModalClosed(true);
  };

  return (
    <div className='modal-container'>
      <div className={showHideClassName}>
        <section className='modal-main'>
          <UserDetailsEditForm
            setFullName={setUserFullName}
            handleFormSubmit={handleFormSubmit}
            userFullName={userFullName}
            onInputChangeHandler={onInputChangeHandler}
            fullName={userFullName}
          />
          <Button
            className='close-modal-button'
            color='secondary'
            type='button'
            onClick={closeModalHandler}
          >
            Close
          </Button>
        </section>
      </div>
    </div>
  );
};
