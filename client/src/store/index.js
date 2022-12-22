import { configureStore } from '@reduxjs/toolkit';
import bikesDataSlice from './bike-data-slice.js';
import userRentalsDataSlice from './user-rental-data-slice';
import uiDataSlice from './ui-details-slice.js';

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    bikesData: bikesDataSlice.reducer,
    userRentalData: userRentalsDataSlice.reducer,
    uiDetailsData: uiDataSlice.reducer,
  },
});

export default store;
