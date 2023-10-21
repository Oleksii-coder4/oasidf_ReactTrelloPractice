import { configureStore } from '@reduxjs/toolkit';
import cardModalReducer from './features/cardModal/cardModalVisibilitySlice';
import boardReducer from './features/board/boardSlice';

export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
    board: boardReducer,
  },
});

// export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
// export type RootState = ReturnType<typeof store.getState>;
