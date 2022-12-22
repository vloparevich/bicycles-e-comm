import axios from 'axios';
import { internalServerError } from './utils.service';

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

const bikeService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/bike`,
});

export function getAllTheBikes() {
  return bikeService
    .get('/allthebikes')
    .then(successStatus)
    .catch(internalServerError);
}

export function deleteBike(bikeId) {
  return bikeService
    .delete(`/${bikeId}`)
    .then(successStatus)
    .catch(internalServerError);
}

export function getBikeAvailabilityOnDate(bikeId, simpleDates) {
  const details = { bikeId, simpleDates };
  return bikeService
    .post(`/availability`, details)
    .then(successStatus)
    .catch(internalServerError);
}

export function getBookingRegistered(userId, bikeId, simpleDates) {
  const details = { userId, bikeId, simpleDates };
  return bikeService
    .post(`/book-bike`, details)
    .then(successStatus)
    .catch(internalServerError);
}

export function createBicycle({
  model,
  color,
  location,
  rating,
  isAvailable,
  pic,
  _id,
}) {
  return bikeService
    .post(`/add-bike`, {
      model,
      color,
      location,
      rating,
      isAvailable,
      pic,
      _id,
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function addMyRatingToTheBike(bikeId, rating, userId) {
  const details = { bikeId, rating, userId };
  return bikeService
    .post(`/add-rating-to-bike`, details)
    .then(successStatus)
    .catch(internalServerError);
}
