import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
};

export const cardModalVisibilitySlice = createSlice({
  name: 'cardModal',
  initialState,
  reducers: {
    showCardModal: (state) => {
      state.isVisible = true;
    },
    hideCardModal: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showCardModal, hideCardModal } = cardModalVisibilitySlice.actions;

export default cardModalVisibilitySlice.reducer;
