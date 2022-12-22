import { createSlice } from '@reduxjs/toolkit';

const initialUiDataState = {
  modalMessage: '',
  userDetails: '',
  fullName: '',
};

const uiDataSlice = createSlice({
  name: 'my-rentals-data',
  initialState: initialUiDataState,
  reducers: {
    setModalDetails(state, action) {
      state.modalMessage = action.payload;
    },

    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setUserFullName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const setuserFullNameThunk = (fullName) => {
  return async (dispatch) => {
    dispatch(uiActions.setUserFullName(fullName));
  };
};

export const uiActions = uiDataSlice.actions;
export default uiDataSlice;
