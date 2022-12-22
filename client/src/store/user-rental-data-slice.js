import { createSlice } from '@reduxjs/toolkit';
import { getMyRentals, getAllUsers } from '../services/users.service';

const initialUserRentalsDataState = {
  userRentals: [],
  bikesAndUsers: [],
};

const userRentalsDataSlice = createSlice({
  name: 'my-rentals-data',
  initialState: initialUserRentalsDataState,
  reducers: {
    setMyRentalsData(state, action) {
      action.payload.reservedBikes.reverse();
      state.userRentals = action.payload;
    },
    setBikesAndUsers(state, action) {
      state.bikesAndUsers = [...action.payload].reverse();
    },
  },
});

export const setUsersReservationsThunk = (userId) => {
  return async (dispatch) => {
    const res = await getMyRentals(userId);
    if (res.data.success) {
      dispatch(userRentalsDataActions.setMyRentalsData(res.data.userRentals));
    }
  };
};

export const setBikesAndUsersThunk = (userId) => {
  return async (dispatch) => {
    const res = await getAllUsers(userId);
    if (res.data.success) {
      dispatch(userRentalsDataActions.setBikesAndUsers(res.data.users));
    }
  };
};

export const userRentalsDataActions = userRentalsDataSlice.actions;
export default userRentalsDataSlice;
