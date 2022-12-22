import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BikeCard } from '../../components/Bike/BikeCard.component';
import { Rating } from './../../components/Rating/Rating.component';
import { useSelector } from 'react-redux';
import { setUsersReservationsThunk } from '../../store/user-rental-data-slice';
import { UsersBookings } from './../../components/UsersBookings/UsersBookings.component';
import './UserRentals.styles.scss';

export const UserRentals = (props) => {
  const userId = props.user._id;
  const dispatch = useDispatch();
  const userRentalsData = useSelector((state) => state.userRentalData);

  useEffect(() => {
    dispatch(setUsersReservationsThunk(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h3>My rentals</h3>
      <hr />
      {userRentalsData?.userRentals.reservedBikes?.map((bike, idx) => (
        <section key={idx + bike._id} className='bikes-bookings-section'>
          <div className='bikes-bookings-container'>
            <div className='bike-card-section'>
              <BikeCard
                {...bike}
                bike={bike}
                isManager={props.user.isManager}
                userId={userId}
                isMyRentalsPage={true}
              />
            </div>
            <div className='bike-bookings-section'>
              {bike.reservations?.map((reservation) => {
                return <UsersBookings key={idx} reservation={reservation} />;
              })}
            </div>
            <div className='rating-section'>
              <Rating {...props} {...bike} />
            </div>
          </div>

          <hr />
        </section>
      ))}
    </div>
  );
};
