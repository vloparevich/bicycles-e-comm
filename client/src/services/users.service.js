import axios from 'axios';
import { internalServerError } from './utils.service';

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

const userService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/users`,
});

export function getUsersWithBookings(userId) {
  return userService
    .get(`/bikes-with-users/${userId}`)
    .then(successStatus)
    .catch(internalServerError);
}

export function getMyRentals(userId) {
  return userService
    .get(`/get-my-rentals/${userId}`)
    .then(successStatus)
    .catch(internalServerError);
}

export function cancelAllTheRevervations(userId, bikeId) {
  return userService
    .get(`/cancel-my-reservations/${userId}/${bikeId}`)
    .then(successStatus)
    .catch(internalServerError);
}
export function getAllUsers(userId) {
  return userService
    .get(`/list-of-users/${userId}`)
    .then(successStatus)
    .catch(internalServerError);
}
export function updateUserDetails(userId, fullName) {
  const details = { userId, fullName };
  return userService
    .post(`/update-user-details`, details)
    .then(successStatus)
    .catch(internalServerError);
}
export function deleteUserAndReleaseBookings(managerId, renterId) {
  return userService
    .delete(`/delete-user-release-bikes/${managerId}/${renterId}`)
    .then(successStatus)
    .catch(internalServerError);
}

export function getUsersRatedBikes(userId) {
  return userService
    .get(`/list-of-rated-bikes-by/${userId}`)
    .then(successStatus)
    .catch(internalServerError);
}
