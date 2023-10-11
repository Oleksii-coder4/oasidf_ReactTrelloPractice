import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  cardData: {},
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
    setCardData: (state, action) => {
      state.cardData = action.payload;
    },
  },
});

export const selectVisibility = (state) => state.cardModal.isVisible;
export const selectCardData = (state) => state.cardModal.cardData;

export const { showCardModal, hideCardModal, setCardData } = cardModalVisibilitySlice.actions;

export default cardModalVisibilitySlice.reducer;
