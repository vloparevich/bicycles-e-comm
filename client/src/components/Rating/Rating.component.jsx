import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { getUsersRatedBikes } from '../../services/users.service';
import { addMyRatingToTheBike } from '../../services/bike.service';
import { useDispatch } from 'react-redux';
import { setUsersReservationsThunk } from '../../store/user-rental-data-slice';
import './Rating.styles.scss';

export const Rating = (props) => {
  const [isRated, setIsrated] = useState(false);
  const [rating, setRating] = useState('');

  const dispatch = useDispatch();

  const userId = props.user._id;
  const bikeId = props._id;

  useEffect(() => {
    const didUserRateThisBike = async () => {
      const ratedBikesResponse = await getUsersRatedBikes(userId);
      const ratedBikes = ratedBikesResponse.data.ratedBikes.filter(
        (ratedBike) => ratedBike._id === bikeId
      );
      if (ratedBikes.length !== 0) {
        setIsrated(true);
      }
    };
    didUserRateThisBike();
  }, [dispatch, userId, bikeId, isRated]);

  const onRatingInputChangeHandler = (e) => {
    let value = e.target.value;
    value > 5 && (value = 5);
    value < 1 && (value = 1);
    setRating(value);
  };

  const rateBikeHandler = async () => {
    if (!isRated) {
      const res = await addMyRatingToTheBike(bikeId, rating, userId);
      if (res.status) {
        setIsrated(true);
        setRating('');
        dispatch(setUsersReservationsThunk(userId));
      }
    }
  };

  return (
    <React.Fragment>
      <div className='rating-container'>
        <Input
          className={`${isRated ? 'diabled-input' : 'input-rating'}`}
          value={rating}
          onChange={onRatingInputChangeHandler}
          type='number'
          id='bike-color'
          name='rating'
          placeholder='1-5'
          disabled={isRated ? true : false}
        />
        <Button
          className='rate-bike-button'
          variant='contained'
          color='secondary'
          size='small'
          disabled={isRated ? true : false}
          onClick={rateBikeHandler}
        >
          {isRated ? 'Bike has been rated' : 'Submit Rating'}
        </Button>
      </div>
    </React.Fragment>
  );
};
