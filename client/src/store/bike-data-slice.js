import { createSlice } from '@reduxjs/toolkit';
import { getAllTheBikes } from './../services/bike.service';

const initialBikeDataState = {
  bikes: [],
  bikesAndTheirRenters: [],
};

const bikesDataSlice = createSlice({
  name: 'bike-data',
  initialState: initialBikeDataState,
  reducers: {
    setBikesData(state, action) {
      const reversedCopy = [
        ...JSON.parse(JSON.stringify(action.payload)),
      ].reverse();
      state.bikes = reversedCopy;
    },
    setBikesAndRenters(state, action) {
      const reversedCopy = [
        ...JSON.parse(JSON.stringify(action.payload)),
      ].reverse();
      state.bikesAndTheirRenters = reversedCopy;
    },
  },
});

export const setBikeDataThunk = () => {
  return async (dispatch) => {
    const res = await getAllTheBikes();
    if (res.data.success) {
      const bikes = res.data.bikes;
      dispatch(getBikeDataActions.setBikesData(bikes));
    }
  };
};

export const getBikeDataActions = bikesDataSlice.actions;
export default bikesDataSlice;
