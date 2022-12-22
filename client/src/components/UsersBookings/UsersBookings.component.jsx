import React from 'react';
import './UsersBookings.styles.scss';

export const UsersBookings = ({ reservation }) => {
  return (
    <React.Fragment>
      <div className='user-bookings-section'>
        <div className='username-contianer'></div>
        <div className='bookings-container'>
          <h4 id='booked-dates-header'>Reservations:</h4>
          {reservation.reservedDates.map((date, idx) => (
            <p key={idx}>✅ {date}</p>
          ))}
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};
