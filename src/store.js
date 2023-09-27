import { configureStore } from '@reduxjs/toolkit';
import cardModalReducer from './features/cardModal/cardModalVisibilitySlice';

export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
  },
});
