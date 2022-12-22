import React, { useEffect, useState, useCallback } from 'react';
import { BikeCard } from '../../components/Bike/BikeCard.component';
import { useSelector } from 'react-redux';
import { UsersBookings } from './../../components/UsersBookings/UsersBookings.component';
import { UserDetails } from '../../components/UserDetails/UserDetails.component';
import { useDispatch } from 'react-redux';
import { GridFilter } from './../../components/GridFilter/GridFilter.component';

import { setBikesAndUsersThunk } from '../../store/user-rental-data-slice';
import ModalMessage from '../../components/UI/ModalMessage';
import './Rentals.styles.scss';

const PRECOPE_MAPPED_OBJECTS_RENTALS = [
  { key: 'username', value: 'Username' },
  { key: 'fullName', value: 'Full Name' },
];

export const Rentals = (props) => {
  const userId = props.user._id;
  const isManager = props.user.isManager;

  const [modalMessage, setModalMessage] = useState('');
  const [filteredUserRentalData, setFilteredUserRentalData] = useState([]);

  const userRentalData = useSelector((state) => state.userRentalData);
  const uiDetailsSlice = useSelector((state) => state.uiDetailsData);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUsersAlongWithBookings = async () => {
      dispatch(setBikesAndUsersThunk(userId));
    };
    getUsersAlongWithBookings();
  }, [dispatch, userId, modalMessage]);

  const modalMessageHandler = () => setModalMessage(() => '');

  const handleDataChange = useCallback((changedData) => {
    setFilteredUserRentalData(changedData);
  }, []);

  return (
    <div className='users-and-bookings-container'>
      {uiDetailsSlice.modalMessage && (
        <ModalMessage
          message={uiDetailsSlice.modalMessage}
          resetModalMessage={modalMessageHandler}
        />
      )}

      <GridFilter
        setParentData={handleDataChange}
        prescopeObjects={PRECOPE_MAPPED_OBJECTS_RENTALS}
        data={userRentalData?.bikesAndUsers}
      />

      {filteredUserRentalData?.map((user, idx) => (
        <React.Fragment key={idx + user._id}>
          <div className='user-and-bookings'>
            <UserDetails {...user} {...props} />
            <div className='bike-card-section'>
              {user.reservedBikes.map((reservedBike, idx) => {
                return (
                  <div key={idx} className='bikes-bookings-container'>
                    <div className='bike-card-section'>
                      <BikeCard
                        {...reservedBike}
                        bike={reservedBike}
                        isManager={isManager}
                      />
                    </div>
                    <div className='bike-bookings-section'>
                      {reservedBike.reservations
                        ?.filter(
                          (reservation) => reservation.user?._id === user._id
                        )
                        .map((reservation, idx) => {
                          return (
                            <UsersBookings
                              key={idx}
                              reservation={reservation}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr className='users-and-rentals-hr' />
        </React.Fragment>
      ))}
    </div>
  );
};
