import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getBikeAvailabilityOnDate,
  getBookingRegistered,
} from './../../services/bike.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelAllTheRevervations } from './../../services/users.service';
import { CalendarCmp } from '../Calendar/CalendarCmp.component';
import { useEffect } from 'react';
import { Controls } from '../Controls/Controls';
import { setUsersReservationsThunk } from '../../store/user-rental-data-slice';
import { setBikeDataThunk } from '../../store/bike-data-slice';
import * as PATHS from './../../utils/paths';

import './BikeCard.styles.scss';

const getDatesFromCalendarObjects = (dates) => {
  const datesInMillis = JSON.stringify(dates).slice(1, -1).split(',');
  return datesInMillis.map((dateInMillis) =>
    new Date(+dateInMillis).toISOString().slice(0, 10)
  );
};

export const BikeCard = ({ isManager, bike, userId, isMyRentalsPage }) => {
  const { pic, model, color, location, rating, _id } = bike;
  const [showCalendar, setShowCalendar] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [dates, setDates] = useState([]);
  const [simpleDates, setSimpleDates] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dates[0]) {
      const formattedDates = getDatesFromCalendarObjects(dates);
      setSimpleDates(formattedDates);
    }
  }, [dates]);

  useEffect(() => {
    setIsAvailable(false);
  }, [dates]);

  const reserveBikeOnDatesHandler = async () => {
    if (userId) {
      await getBookingRegistered(userId, _id, simpleDates);
      setIsAvailable((prev) => !prev);
      setShowCalendar((prev) => !prev);
      setDates('');
      dispatch(setUsersReservationsThunk(userId));
      dispatch(setBikeDataThunk());
    } else {
      navigate(PATHS.SIGNUPPAGE);
    }
  };

  const calendarButtonHandler = () => {
    setShowCalendar((prev) => !prev);
    setDates('');
  };

  useEffect(() => {
    const checkAvailability = async () => {
      const res = await getBikeAvailabilityOnDate(_id, simpleDates);
      if (!res.data.isBookedOnThisDate && dates.length) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    };
    checkAvailability();
  }, [dates, simpleDates, _id, userId]);

  const cancelAllTheRevervationsHandler = async () => {
    await cancelAllTheRevervations(userId, _id);
    dispatch(setUsersReservationsThunk(userId));
  };

  const ratingStarts = bike.rating
    ? '⭐️'.repeat(bike.rating.ratingValue)
    : '😃';

  return (
    <div className='bike-card-container'>
      <div className='bike-image'>
        <img src={pic} alt='bicycles-pic' />
      </div>
      <div className='bike-details'>
        <div className='rating-star'>Rating: {ratingStarts}</div>
        <div>Model: {model} </div>
        <div>Color: {color}</div>
        <div>Location: {location}</div>
        {!isManager && (
          <React.Fragment>
            <CalendarCmp
              calendarButtonHandler={calendarButtonHandler}
              showCalendar={showCalendar}
              dates={dates}
              setDates={setDates}
            />
          </React.Fragment>
        )}
        {showCalendar && (
          <Button
            className='reserve-button'
            variant='contained'
            color='success'
            mt={1}
            disabled={!isAvailable ? true : false}
            onClick={reserveBikeOnDatesHandler}
          >
            BOOK
          </Button>
        )}
        {isMyRentalsPage && !showCalendar && (
          <Button
            className='reserve-button'
            variant='contained'
            color='warning'
            onClick={cancelAllTheRevervationsHandler}
            startIcon={<DeleteIcon />}
          >
            Cancel reservations
          </Button>
        )}
      </div>
      {isManager && <Controls {...bike} bikeId={_id} />}
    </div>
  );
};
